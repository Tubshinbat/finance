// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {

  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn"
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // exp, inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    addListItem: function (item, type) {
      // Орлого зарлагын элементийг агуулсан html-ийг бэлтгэнэ.
      var html, list;
      if (type === 'inc') {
        list = '.income__list';
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>';
      } else {
        list = '.expenses__list';
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button></div></div> </div>'
      }
      // Тэр HTML дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
      html = html.replace('%id%', item.id);
      html = html.replace('$$DESCRIPTION$$', item.description);
      html = html.replace('$$VALUE$$', item.value);

      // Бэлтгэсэн HTML ээ DOM руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML('beforeend', html);


    }

  };
})();


// Санхүүтэй ажиллах контроллер
var financeController = (function () {
  // private function
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private function
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private data
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };

  return {
    addItem: function (type, desc, val) {
      // console.log("type: " + type + ' Desc: ' + desc + ' val: ' + val);
      var item, id;

      // identification (id)
      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === 'inc') {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    }

  }

})();
// Програмын холбогч контроллер
var appController = (function (uiController, fnController) {
  var ctrlAddItem = function () {
    // 1. Оруулах өгөгдли йг дэлгэцээс олж авна.
    var input = uiController.getInput();

    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    var item = financeController.addItem(input.type, input.description, input.value);

    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
    uiController.addListItem(item, input.type);
    // 4. Төсвийг тооцоолно
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  }

  var setupEventListners = function () {

    var DOM = uiController.getDOMstrings();

    document.querySelector('.add__btn').addEventListener('click', function () {
      ctrlAddItem();
    });

    document.addEventListener('keypress', function (event) {
      if (event.key === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log('Appliction started...');
      setupEventListners();
    }
  }
})(uiController, financeController);

appController.init();
