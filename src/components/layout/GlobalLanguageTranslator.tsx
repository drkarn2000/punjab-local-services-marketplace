'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { translateUiString } from '@/data/uiTranslationsMap';

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'SVG']);

export function GlobalLanguageTranslator() {
  const { language } = useMarketplace();
  const pathname = usePathname();

  const originalTextMap = useRef(new WeakMap<Text, string>());
  const lastAppliedMap = useRef(new WeakMap<Text, string>());
  const originalAttrMap = useRef(
    new WeakMap<Element, { placeholder?: string; ariaLabel?: string }>()
  );
  const isApplying = useRef(false);

  useEffect(() => {
    document.documentElement.lang = language;

    const applyTranslations = () => {
      if (isApplying.current) return;
      isApplying.current = true;

      try {
        // 1. Translate text nodes
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
              if (parent.closest('[data-no-translate="true"]')) {
                return NodeFilter.FILTER_REJECT;
              }
              if (!node.nodeValue || !node.nodeValue.trim()) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            },
          }
        );

        let current: Node | null = walker.nextNode();
        while (current) {
          const textNode = current as Text;
          const currentVal = textNode.nodeValue || '';
          const lastWritten = lastAppliedMap.current.get(textNode);

          // If React updated this node with new source text, record the new original
          if (
            !originalTextMap.current.has(textNode) ||
            (lastWritten !== undefined && currentVal !== lastWritten)
          ) {
            originalTextMap.current.set(textNode, currentVal);
          }

          const orig = originalTextMap.current.get(textNode) || currentVal;
          const nextVal =
            language === 'en' ? orig : translateUiString(orig, language);

          if (currentVal !== nextVal) {
            textNode.nodeValue = nextVal;
          }
          lastAppliedMap.current.set(textNode, nextVal);

          current = walker.nextNode();
        }

        // 2. Translate input/textarea placeholders
        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach((el) => {
          let stored = originalAttrMap.current.get(el);
          if (!stored) {
            stored = {
              placeholder: el.getAttribute('placeholder') || undefined,
            };
            originalAttrMap.current.set(el, stored);
          }
          if (stored.placeholder) {
            const target =
              language === 'en'
                ? stored.placeholder
                : translateUiString(stored.placeholder, language);
            if (el.getAttribute('placeholder') !== target) {
              el.setAttribute('placeholder', target);
            }
          }
        });
      } finally {
        isApplying.current = false;
      }
    };

    // Initial pass after render
    const rafId = requestAnimationFrame(applyTranslations);

    // Observe React DOM updates (tabs, sliders, routes, filters)
    let scheduled = 0;
    const observer = new MutationObserver(() => {
      if (isApplying.current) return;
      if (scheduled) cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(applyTranslations);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (scheduled) cancelAnimationFrame(scheduled);
      observer.disconnect();
    };
  }, [language, pathname]);

  return null;
}
