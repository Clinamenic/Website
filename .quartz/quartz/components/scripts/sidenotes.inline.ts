// Sidenotes interactive behavior - position relative to referenced blocks
document.addEventListener("nav", () => {
  const sidenotes = document.querySelectorAll('.sidenote-tile')
  if (sidenotes.length === 0) return

  // Position sidenotes relative to their referenced blocks
  function positionSidenotes() {
    sidenotes.forEach(sidenote => {
      const blockId = sidenote.getAttribute('data-block-id')
      
      if (!blockId) return
      
      // Find the corresponding block in the main content
      const targetBlock = document.getElementById(blockId)
      if (!targetBlock) return
      
      // Get the target block's position relative to the viewport
      const blockRect = targetBlock.getBoundingClientRect()
      
      // Position the individual sidenote tile at the same viewport height as the block
      const viewportTop = blockRect.top
      
      // Add some padding to avoid covering the content
      const offsetTop = Math.max(viewportTop, -4000) // Don't go above 20px from top
      
      // Position the individual sidenote tile (not the entire sidebar)
      const tile = sidenote as HTMLElement
      tile.style.top = `${offsetTop}px`
    })
  }

  // Position sidenotes on load
  positionSidenotes()

  // Reposition on scroll and resize for smooth tracking
  let repositionTimer: number | null = null
  function scheduleReposition() {
    if (repositionTimer) {
      cancelAnimationFrame(repositionTimer)
    }
    repositionTimer = requestAnimationFrame(positionSidenotes)
  }

  window.addEventListener('scroll', scheduleReposition)
  window.addEventListener('resize', scheduleReposition)

  // Highlight referenced blocks on hover
  sidenotes.forEach(sidenote => {
    const blockId = sidenote.getAttribute('data-block-id')
    if (!blockId) return
    
    const targetBlock = document.getElementById(blockId)
    if (!targetBlock) return

    sidenote.addEventListener('mouseenter', () => {
      targetBlock.classList.add('block-highlighted')
    })

    sidenote.addEventListener('mouseleave', () => {
      targetBlock.classList.remove('block-highlighted')
    })
  })

  // Cleanup function
  window.addCleanup(() => {
    window.removeEventListener('scroll', scheduleReposition)
    window.removeEventListener('resize', scheduleReposition)
    
    sidenotes.forEach(sidenote => {
      const blockId = sidenote.getAttribute('data-block-id')
      if (blockId) {
        const targetBlock = document.getElementById(blockId)
        targetBlock?.classList.remove('block-highlighted')
      }
    })
  })
})

export {} 