document.addEventListener('DOMContentLoaded', function() {
  const pdfInput = document.getElementById('pdf-input');
  const uploadStatus = document.getElementById('upload-status');

  // File input change listener
  pdfInput.addEventListener('change', function() {
    if (!pdfInput.files[0]) {
      // No file selected or selection cancelled
      uploadStatus.textContent = '';
      uploadStatus.className = '';
      return;
    }

    // File selected
    const filename = pdfInput.files[0].name;
    uploadStatus.textContent = `Selected "${filename}" (ready to upload)`;
    uploadStatus.className = 'text-sm text-green-400 mt-2 min-h-[1.25rem] font-medium';
  });
});
