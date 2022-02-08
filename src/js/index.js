//요구 사항 구현 전략

// localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
//- [] localStorage 에 데이터를 저장한다.
// -[] localStorage 데이터를 읽어온다.

// 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
//- [] 카테고리 별 메뉴판 관리

// 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
//- [] 로딩될때 localStorage에 에스프레소 메뉴를 불러온다.
//- [] 에스프레소 메뉴를 페이지에 노출한다.

// 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
//- [] 품절버튼을 추가 한다.
//- [] 품절버튼을 클릭하면 해당 메뉴를 localStorege에 저장한다.
//- [] 해당 메뉴에 상태를 변경한다.



const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  
  getLocalStorage() {
    localStorage.getItem("menu");
  }
};

function App() {
  //변하는값(싱태) = 메뉴명 
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    //빈값이라면 모달 창으로 알리기
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력해 주세요");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    //espressoMenuName ul 에 추가
    const menuItemTemplete = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
				<span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
				<button
					type="button"
					class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
				>
					수정
				</button>
				<button
					type="button"
					class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
				>
					삭제
				</button>
			</li>`;
    };

    //누적으로 메뉴가 쌓이게 만든다.
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplete(espressoMenuName)
    );

    updateMenuCount();

    //추가 한 후 input초기화
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (event) => {
    const $menuName = event.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴를 수정하세요", $menuName.innerText);

    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (event) => {
    if (confirm("삭제 하시겠습니까?")) {
      event.target.closest("li").remove();
      updateMenuCount();
    }
  };

  $("#espresso-menu-form").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (event) => {
    //엔터가 아니면
    if (event.key !== "Enter") return;

    addMenuName();
  });

  $("#espresso-menu-list").addEventListener("click", (event) => {
    if (event.target.classList.contains("menu-edit-button")) {
      updateMenuName(event);
    }

    if (event.target.classList.contains("menu-remove-button")) {
      removeMenuName(event);
    }
  });

  //step2
  
}

App();
