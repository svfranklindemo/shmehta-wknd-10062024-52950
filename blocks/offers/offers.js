import { getOffer } from '../../scripts/nissan-services.js';

export default function decorate(block) {
  console.log(block);
  const fetchPromises = [...block.children].map((el) => getOffer(el.textContent.trim()));

  Promise.all(fetchPromises).then((allOffers) => {
    const elOffers = allOffers.map((offer) => {
      const divElement = document.createElement('div');
      divElement.className = 'offer-container';
      divElement.innerHTML = `<div class="top-section wds-row" style="height: 96px;">
              <div class="wds-col-12 wds-col-md-12">
                  <h4 class="wds-type-subtitle-m wds-margin-bottom-8 offer-detail-title-strapline">${offer?.title?.strapline}</h4>
                  <h3 class="wds-type-display-s offer-detail-title-headline">${offer?.title?.headline}</h3>
                  <div class="offer-detail-model">
                      <h5 class="wds-type-body-regular-m offer-detail-model-name">${offer?.model?.name}</h5>
                      <h5 class="wds-type-body-regular-m offer-detail-applicability">${offer?.applicability}</h5>
                  </div>
              </div>
          </div>
          <div class="wds-row">
              <div class="offer-detail-image wds-col-12">
                <section class="apigeee-responsive-image-container maintain-aspect-ratio">
                    <picture alt="${offer?.model?.name}" class="responsive-image picture-container classic-offers-images vehicle-image">
                        <source media="(min-width: 1440px)" srcset="${offer?.images?.detail?.largeStdRes}, ${offer?.images?.detail?.largeHiRes}">
                        <source media="(min-width: 768px)" srcset="${offer?.images?.detail?.mediumStdRes}, ${offer?.images?.detail?.mediumHiRes}">
                        <source srcset="${offer?.images?.detail?.smallStdRes}, ${offer?.images?.detail?.smallHiRes}">
                        <img alt="${offer?.model?.name}" class="responsive-image image-container classic-offers-images vehicle-image clickable" src="${offer?.images?.detail?.smallStdRes}" tabindex="0"></picture>
                        <p class="wds-type-body-regular-s image-disclaimer">${offer?.images?.detail?.disclaimer}</p>
                </section>
              </div>
              <div class="wds-col-12">
                  <a class="wds-type-subtitle-m classic-offer-cta" role="button" tabindex="0" data-di-id="di-id-1fbdf338-84ffa788"><span>Offer Details</span></a>
              </div>
          </div>`;
      return divElement;
    });

    block.innerHTML = '';
    elOffers.forEach((elem) => block.append(elem));
  }).catch((error) => {
    block.innerHTML = '';
    console.error('There has been a problem with your fetch operation:', error);
  });
}
