// const modal = document.querySelector('.modal-overlay');
// const modalCloseButton = modal.querySelector('i');
const cardsImages = document.querySelectorAll('.card__image-container');
// const iframe = modal.querySelector('iframe');

// function toggleModal(iframeSrc) {
//   modal.classList.toggle('active');
//   if (iframeSrc) {
//     iframe.src = `https://youtube.com/embed/${iframeSrc}`;
//   }
//   if (!modal.classList('active')) {
//     iframe.src = '';
//   }
// }

for (let card of cardsImages) {
  card.addEventListener('click', () => {
    let videoId = card.getAttribute('id');
    window.location.href = `/video?id=${videoId}`;
  });

  // card.addEventListener('click', () => {
  //   toggleModal(videoId);
  // });
}

// modalCloseButton.addEventListener('click', toggleModal);

// document.addEventListener('click', e => {
//   if (e.target === modal) {
//     modal.classList.remove('active');
//     iframe.src = '';
//   }
// });

////// Active tab controller ///////

if (document.title === 'Portfolio - jvmMachado') {
  document.querySelector('.about-link').classList.remove('active-tab');
  document.querySelector('.portfolio-link').classList.add('active-tab');
}
