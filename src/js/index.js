//요구 사항 구현 전략

//TO-DO 메뉴 추가
//- [X] 메뉴의 이름을 입력 받고 엔터키를 누르면 메뉴가 추가 된다.
// -[X] 추가 되는 메뉴는 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
//- [X] 총 갯수의 count 가 상단에 노출 된다.
//- [X] 메뉴가 추가 되고 나면, input 값은 빈값이 된다.
//- [X] 사용자 값이 빈 값이라면 추가 되지 않는다.
//- [X] 메뉴 이름을 입력 받고 확인 버튼을 클릭 하면 메뉴 추가를 한다.

//TO-DO 메뉴 수정
//- [X] 메뉴 수정 버튼을 누르면, 모달이 활성화가 된다.
//- [X] 알트창에 변경할 메뉴를 적고 확인 버튼을 누르면 업데이트가 된다.

//TO-DO 메뉴 삭제
//- [X] 삭제 버튼을 누르면, 확인 모달창이 뜬다.
//- [X] 모달창의 확인버튼이 뜨면 메뉴가 삭제 된다.
//- [X] 삭제된 갯수를 뺸 나머지count 가 상단에 노출 된다.

const $ = (selector) => document.querySelector(selector);

function App() {
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
