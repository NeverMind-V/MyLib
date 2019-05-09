function showPage(data) {
  const container = document.querySelector('.js-material');
  if (container) {
    const params = new URLSearchParams(window.location.search);
    let currentData = data.filter(item => item.id === params.get('id'));
    [currentData] = currentData;
    switch (currentData.type) {
      case 'file-alt':
        container.innerHTML = `
                  <section class="material">
                      <div class="material__thumb-wrapper">
                          <img src="${currentData.thumbnail}" alt="thumbnail" class="material__thumb-text">
                      </div>
                      <div class="material__block">
                          <h1 class="material__title">${currentData.name}</h1>
                          <p class="material__desription">${currentData.description}</p>
                      </div>
                  </section>`;
        break;
      case 'music':
        container.innerHTML = `
                  <section class="material">
                      <figure class="material__audio-figure">
                          <div class="material__thumb-wrapper">
                              <img src="${currentData.thumbnail}" alt="thumbnail" class="material__thumb-audio">
                          </div>                        
                          <figcaption>
                              <h1 class="material__title">${currentData.name}</h1>
                          </figcaption>
                          <audio controls class="material__audio">
                              <source src="${currentData.url}" type="audio/mpeg">
                          </audio>
                      </figure>                    
                  </section>`;
        break;
      case 'video':
        container.innerHTML = `
                  <section class="material">
                      <figure class="material__video-figure">
                          <video controls class="material__video">
                              <source src="${currentData.url}" type="audio/mp4">
                          </video>
                          <figcaption>
                              <h1 class="material__title">${currentData.name}</h1>
                          </figcaption>
                      </figure>                    
                  </section>`;
        break;
      default:
        break;
    }
  }
}

export default showPage;
