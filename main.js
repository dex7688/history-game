'strict mode';

// 데이터 불러오기
const fetchData = async () => {
  const response = await fetch('./data.json');
  const result = await response.json();
  return result.data;
};

// item element 생성
const createElement = async () => {
  // itemList 선택
  const itemList = document.querySelector('.itemList');

  // data 가져오기
  const items = await fetchData();

  // 임의의 순서를 가지는 배열 생성
  const dataLength = 17;
  const randomDataOrder = Array.from({ length: dataLength }, (v, i) => i).sort(() => Math.random() - 0.5);

  // 임의의 순서를 가진 배열을 이용하여 element 생성
  randomDataOrder.forEach((item) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('item');
    createDiv.textContent = items[item].content;
    createDiv.dataset.answer = items[item].order;
    itemList.appendChild(createDiv);
  });

  clickEvent();
};
// createElement();

const clickEvent = () => {
  const items = document.querySelectorAll('.item');
  let num = 1;

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('selected')) {
        console.dir(e.target);

        e.target.classList.add('selected');
        const selectedOrder = document.createElement('span');
        selectedOrder.classList.add('order');
        selectedOrder.textContent = num;
        item.appendChild(selectedOrder);
        num += 1;
      } else {
        if (e.target.childNodes[1].textContent == num - 1) {
          e.target.classList.remove('selected');
          const targeted = e.target.childNodes[1];
          e.target.removeChild(targeted);
          num -= 1;
        } else {
          return;
        }
      }
    });
  });
};

const handleBtnClick = async () => {
  const btn = document.querySelector('button');
  const answer = await fetchData();
  const answerList = answer.map((item) => item.content);

  btn.onclick = () => {
    const submited = document.querySelectorAll('.order');
    console.log(submited);
    const submitedList = [...submited].map((item, index) => {
      if (item.parentElement.firstChild.data === answerList[Number(item.textContent) - 1]) {
        item.classList.add('pass');
      } else {
        item.classList.add('fail');
      }
    });
  };
};

// 정답보기 버튼 클릭시 모든 item 요소에 'show' 클래스 토글
const showAnswerBtnClick = () => {
  const showAnswerBtn = document.querySelector('.showAnswerBtn');
  showAnswerBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    items.forEach((item) => item.classList.toggle('show'));
  });
};

createElement();
handleBtnClick();
showAnswerBtnClick();
