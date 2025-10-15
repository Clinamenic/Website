function createImageModal() {
  console.log("Creating image modal elements")
  
  // Create the modal HTML directly to avoid potential issues with event binding
  const modalHTML = `
    <div class="image-modal-outer">
      <div class="image-modal-container">
        <div class="close-button" aria-label="Close image">×</div>
        <div class="image-modal-content"></div>
      </div>
    </div>
  `;
  
  // Insert the HTML into the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Get references to the elements
  const modalOuter = document.querySelector('.image-modal-outer') as HTMLElement;
  const modalContainer = modalOuter.querySelector('.image-modal-container') as HTMLElement;
  const modalContent = modalOuter.querySelector('.image-modal-content') as HTMLElement;
  const closeButton = modalOuter.querySelector('.close-button') as HTMLElement;
  
  console.log("Modal elements created and appended to body")
  return {
    modalOuter,
    modalContainer,
    modalContent,
    closeButton
  }
}

function setupImageHoverCaptions() {
  // Find all images with the gallery-img class that aren't already in a .media-item container
  const galleryImages = Array.from(document.querySelectorAll('img.gallery-img')).filter(img => 
    !img.closest('.media-item') && 
    !img.closest('.unicolumn-row') &&
    !img.closest('.img-wrapper')
  );
  
  console.log(`Setting up hover captions for ${galleryImages.length} gallery images`);
  
  galleryImages.forEach(img => {
    // Ensure img is treated as HTMLImageElement
    const imgElement = img as HTMLImageElement;
    
    // Skip if already processed
    if (imgElement.dataset.captionAdded) return;
    
    // Only add caption if alt text exists and isn't empty
    if (imgElement.alt && imgElement.alt.trim() !== '') {
      // Create a wrapper that's positioned relative to the image
      const wrapper = document.createElement('div');
      wrapper.className = 'img-wrapper';
      
      // Save the original styles
      const originalStyle = {
        display: imgElement.style.display || 'inline-block',
        margin: imgElement.style.margin || '0',
        maxWidth: imgElement.style.maxWidth || '100%',
        height: imgElement.style.height || 'auto'
      };
      
      // Position the wrapper where the image was
      if (imgElement.parentElement) {
        // Clone the image to preserve all its attributes
        const imgClone = imgElement.cloneNode(true) as HTMLImageElement;
        
        // Copy any inline styles from the original image
        imgClone.style.display = 'block';
        imgClone.style.maxWidth = '100%';
        imgClone.style.height = 'auto';
        imgClone.style.margin = '0';
        
        // Replace the original image with the wrapper
        imgElement.parentElement.insertBefore(wrapper, imgElement);
        wrapper.appendChild(imgClone);
        imgElement.parentElement.removeChild(imgElement);
        
        // Create caption element
        const caption = document.createElement('p');
        caption.className = 'img-hover-caption';
        caption.textContent = imgClone.alt;
        
        // Add caption to wrapper
        wrapper.appendChild(caption);
        
        // Mark as processed
        imgClone.dataset.captionAdded = 'true';
      } else {
        console.warn('Image has no parent element, cannot add caption wrapper', imgElement);
      }
    }
  });
}

function initializeImageModal() {
  console.log("Initializing image modal")
  
  // Create the modal
  const { modalOuter, modalContainer, modalContent, closeButton } = createImageModal()
  
  // Flag to track if the modal is open
  let isModalOpen = false
  
  // Function to open the modal with an image
  function openModal(img: HTMLImageElement) {
    if (isModalOpen) return;
    
    console.log("Opening modal with image:", img.src);
    
    // Create new image for modal
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    // Clear and update modal content
    modalContent.innerHTML = '';
    modalContent.appendChild(modalImg);
    
    // Add alt text as subtitle if it exists
    if (img.alt && img.alt.trim() !== '') {
      const captionElement = document.createElement('p');
      captionElement.className = 'image-modal-caption';
      captionElement.textContent = img.alt;
      modalContent.appendChild(captionElement);
    }
    
    // Show modal with animation
    isModalOpen = true;
    modalOuter.classList.add('active');
    setTimeout(() => modalContainer.classList.add('active'), 10);
  }
  
  // Function to close the modal
  function closeModal() {
    if (!isModalOpen) return;
    
    console.log("Closing modal");
    isModalOpen = false;
    modalContainer.classList.remove('active');
    setTimeout(() => modalOuter.classList.remove('active'), 300);
  }
  
  // Click handler for images with class 'gallery-img'
  document.body.addEventListener('click', (e) => {
    if (!isModalOpen && 
        e.target instanceof HTMLImageElement && 
        e.target.classList.contains('gallery-img')) {
      openModal(e.target);
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  // Direct click handler for the close button
  closeButton.addEventListener('click', function(e) {
    console.log("Close button clicked");
    closeModal();
    e.preventDefault();
    e.stopPropagation();
  });
  
  // Click handler for the backdrop
  modalOuter.addEventListener('click', function(e) {
    if (e.target === modalOuter) {
      console.log("Background clicked");
      closeModal();
    }
  });
  
  // Prevent clicks on the modal container from closing the modal
  modalContainer.addEventListener('click', function(e) {
    if (e.target !== closeButton) {
      e.stopPropagation();
    }
  });
  
  // Keyboard support for Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  });
  
  // Setup hover captions only for gallery images
  setupImageHoverCaptions();
  
  // Clean up on navigation
  window.addCleanup?.(() => {
    console.log("Cleaning up modal");
    if (modalOuter) modalOuter.remove();
  });
}

// Handle navigation events
document.addEventListener("nav", () => {
  console.log("Navigation event detected, initializing modal")
  initializeImageModal()
})

// Initialize on first page load
if (document.readyState === 'complete') {
  initializeImageModal()
} else {
  window.addEventListener('load', () => {
    initializeImageModal()
    
    // Setup MutationObserver to handle dynamically added content
    const observer = new MutationObserver((mutations) => {
      let shouldRefresh = false
      
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain images
          for (const node of Array.from(mutation.addedNodes)) {
            if (node instanceof HTMLElement) {
              const hasImages = node.querySelector('img')
              if (hasImages) {
                shouldRefresh = true
                break
              }
            }
          }
        }
        
        if (shouldRefresh) break
      }
      
      if (shouldRefresh) {
        console.log("DOM changed, refreshing image captions")
        setupImageHoverCaptions()
      }
    })
    
    // Start observing
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    })
    
    // Add cleanup for observer
    window.addCleanup?.(() => {
      observer.disconnect()
    })
  })
}

window.addCleanup?.(() => {
  const modalOuter = document.querySelector('.image-modal-outer')
  if (modalOuter) {
    console.log("Cleaning up modal on page change")
    modalOuter.remove()
  }
}) 