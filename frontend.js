//grab DOM elements needed//
display = document.querySelector(".populate-ui");
submit = document.querySelector("#btn");


    function clearUI() {
        display.innerHTML = "";
    }
    
    function createLoadingUI() {
        display.innerHTML = `
        <div class="loadingContainer">
        <div class="col s12 m6 offset-m3">
          <div class="card center-align">
            <div class="card-content">
            <span class="card-title text-bold">
            <i class="fa-sharp fa-solid fa-truck truck fa-bounce fa-2xl" style="color: #89bcd2;"></i>
              <p> Your Dream Job is on it's Way</p>
               </span>
               </div>
          </div>
        </div>
        </div>
    </div>
    <div class="progress margin-bottom">
    <div class="indeterminate"></div>
    </div>`;
}

async function postData(locationInput,techInput) {
    // var locationInput ="India"
    // const techInput = "React";
    event.preventDefault();
    const customURL = `https://www.google.com/search?ei=HSq0Xt7IDoz5gQbGip6ABg&q=${techInput}+${locationInput}&oq=${techInput}+${locationInput}+jobs+&gs_lcp=CgZwc3ktYWIQAzIFCCEQoAEyBQghEKABMgUIIRCgATIFCCEQoAE6BggAEAgQHjoGCAAQFhAeUOYSWNIXYIIZaABwAHgAgAGrAYgB7QaSAQM1LjOYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&uact=5&ibp=htl;jobs&sa=X&ved=2ahUKEwiH6N6-iaLpAhX9QUEAHTWjBGMQiYsCKAF6BAgKEBE#fpstate=tldetail&htivrt=jobs&htidocid=odTsQfLDpmatfzNQAAAAAA%3D%3D`;
    const dataToSend = { customURL, techInput };
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    const response = await fetch(
      "http://localhost:5500/something",
      fetchOptions
    );

    const data = await response.json();

    renderData(data.resultArr);
  }

  function renderData(data) {
    clearUI();
    let titleArray = data;

    titleArray.forEach((title,i) => {
      const card = document.createElement("div");
      card.classList.add("row");
      card.innerHTML = `
      <div class="contentContainer">
        <a class="anchors" href= ${title.href}>
            <div class="cardDiv">
                <div class="card">
                    <div class="card-content">
                       ${i+1}. <span class="card-title text-bold"><span></span>${title.title}</span>
                    </div>
                </div>
            </div>
        </a>
        </div>`;
      display.appendChild(card);
    });
  }
// }

//instances and events//

// const ui = new UI();

document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
  let locationInput = document.getElementById('location').value
  let techInput = document.getElementById('skills').value
  clearUI();
  createLoadingUI();
  postData(locationInput, techInput);
});

console.log(submit);
