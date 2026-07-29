import { showToast } from '../utils/toast.js';

export function initContactMe() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !submitBtn) return;

  const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    const formData = new FormData(form);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message.');
      }

      showToast('Message sent successfully!', 'success');
      form.reset();
    } catch (err) {
      showToast(err.message || 'Failed to submit form.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
    }
  });
}
