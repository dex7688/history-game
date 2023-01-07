'strict mode';

// 데이터 불러오기
const fetchData = async () => {
  const response = await fetch('./data.json');
  const result = await response.json();
  return result.data;
};

// 랜덤으로 보여주기 위해
const createRandomArray = () => {
  let number = Math.floor(Math.random() * 17);
  const randomArr = [];

  while (randomArr.length !== 17) {
    if (!randomArr.includes(number)) {
      randomArr.push(number);
    } else {
      number = Math.floor(Math.random() * 17);
    }
  }

  return randomArr;
};

const createElement = async () => {
  const itemList = document.querySelector('.itemList');
  const items = await fetchData();
  const randomArray = createRandomArray();

  randomArray.forEach((item) => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('item');
    createDiv.textContent = items[item].content;

    const answerSpan = document.createElement('span');
    answerSpan.classList.add('answer');
    answerSpan.textContent = items[item].order;

    createDiv.appendChild(answerSpan);

    itemList.appendChild(createDiv);
  });

  clickEvent();
  handleAnswerClick();
};

const clickEvent = () => {
  const listItems = document.querySelectorAll('.item');
  let num = 1;

  listItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      console.dir(item);

      if (!e.target.classList.contains('selected')) {
        e.target.classList.add('selected');
        const eltSpan = document.createElement('span');
        eltSpan.classList.add('order');
        eltSpan.textContent = num;

        item.appendChild(eltSpan);
        num += 1;
      } else {
        if (e.target.childNodes[2].textContent == num - 1) {
          e.target.classList.remove('selected');
          const targeted = e.target.childNodes[2];
          e.target.removeChild(targeted);
          num -= 1;
        } else {
          return;
        }
      }
    });
  });

  handleBtnClick();
};

createElement();

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

handleBtnClick();

const handleAnswerClick = () => {
  const solBtn = document.querySelector('.solution');
  solBtn.onclick = () => {
    const answer = document.querySelectorAll('.answer');
    answer.forEach((item) => {
      item.classList.toggle('show');
    });
  };
};
