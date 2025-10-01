/*
  -- Console 창 연습 --
  (Application > Local storage ▼ 내부 (http:// 또는 file://) 클릭 -> 입력/삭제 등 확인)
  [내용 저장] localStorage.setItem(1, "첫 번째 값")
  [저장값 가져오기] localStorage.getItem(1)  => [출력] "첫 번째 값"
  [로컬 스토리지 내용 삭제] localStorage.clear()

  배열을 로컬 스토리지에 저장하고 가져오기
  // JSON.stringify() 메서드 : 배열에 있는 여러 값을 하나의 문자열처럼 변환해서 저장.
  // Json.parse() 메서드 : 로컬 스토리지에 있는 여러 값으로 된 문자열을 가져와 배열 형태로 변환할 때 사용

  var colors = ["red", "green", "blue", "white", "black"]
  localStorage.setItem("mycolor", JSON.stringify(colors)) // colors 배열을 문자열로 변경, 로컬 스토리지의 "mycolor" 키에 저장.

  // 로컬 스토리지에서 JSON 문자열을 가져와 newColors 변수에 저장.
  [배열 만들기, 배열 문자열 변경, 로컬 스토리지의 키에 저장] var newColors = JSON.parse(localStorage.getItem("colors"))
  newColors   => ▶ (5) ["red", "gree", "blue", "white", "black"]
  [로컬 스토리지 지우기] localStorage.clear()
*/

// -- 기존 공유한 JS 파일에 소스코드 추가하는 정도... --

var itemList = []; // 배열 추가

var addBtn = document.querySelector("#add");
addBtn.addEventListener("click", addList); // addBtn.onclick = addList; 라고 해도 됨

getItems(); // 함수 실행

// 로컬 스토리지에서 자료 가져오기 (함수 위치 상관X)
function getItems() {
  var storedData = localStorage.getItem("storageList");
  if(storedData != null) itemList = JSON.parse(storedData);
  showList();
}

// 로컬 스토리지를 사용해 준비물 점검 목록 만들기
function addList() {
  var item = document.querySelector('#item').value;
  if(item != null) {
    itemList.push(item);
    document.querySelector('#item').value = "";
    document.querySelector('#item').focus();
  }
  localStorage.setItem("storageList", JSON.stringify(itemList));
  showList();
}

function showList() {
  var list = "<ul>"; // 목록을 시작하는 <ul> 태그 저장
  for(var i = 0; i < itemList.length; i++) { // 배열 요소마다 반복
    list += "<li>" + itemList[i] + "<span class='close' id=" + i + ">X</span></li>"; // 요소와 삭제 버튼을 <li>~</li>로 묶음
  }
  list += "</ul>"; // 목록을 끝내는 </ul> 태그 저장

  document.querySelector('#itemList').innerHTML = list; // list 내용 표시

  var remove = document.querySelectorAll(".close"); // 삭제 버튼을 변수로 저장. 배열 형태가 됨
  for(var i = 0; i < remove.length; i++) { // remove 배열의 요소 모두를 확인
    remove[i].addEventListener("click", removeList); // 요소를 클릭하면 removeList() 실행
  }
}

function removeList() {
  var id = this.getAttribute("id"); // this(클릭한 삭제 버튼)의 id 값 가져와 id 변수에 저장
  itemList.splice(id, 1); // itemList 배열에서 인덱스 값이 id인 요소 1개 삭제
  showList(); // 변경된 itemList 배열을 다시 화면에 표시
}

// 로컬 스토리지 지우기
// localStorage.clear()
