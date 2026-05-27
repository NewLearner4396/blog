import { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'

let mermaidId = 0

export default defineComponent({
  name: 'MermaidChart',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const svg = ref('')
    let observer: MutationObserver | null = null

    const renderMermaid = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const { default: mermaid } = await import('mermaid')
      const code = decodeURIComponent(props.code)
      const darkMode = document.documentElement.classList.contains('dark')

      mermaid.initialize({
        startOnLoad: false,
        theme: darkMode ? 'dark' : 'default',
        securityLevel: 'loose',
      })

      try {
        const { svg: rendered } = await mermaid.render(
          `mermaid-${mermaidId++}`,
          code,
        )
        svg.value = rendered
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        svg.value = `<pre style="white-space: pre-wrap; color: #c0392b;">${message}</pre>`
      }
    }

    onMounted(() => {
      void renderMermaid()

      observer = new MutationObserver(() => {
        void renderMermaid()
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
    })

    watch(
      () => props.code,
      () => {
        void renderMermaid()
      },
    )

    onBeforeUnmount(() => {
      observer?.disconnect()
    })

    return () =>
      h('div', { class: 'mermaid-chart' }, [
        h('div', {
          class: 'mermaid-chart__content',
          innerHTML:
            svg.value ||
            '<div style="padding: 0.75rem 0; color: var(--vp-c-text-mute);">Loading diagram...</div>',
        }),
      ])
  },
})
