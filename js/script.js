var bookForm = $('.bookForm');
var showBookFormBtn = $('.showBookForm');

var bookFormAdd = $('.bookFormAdd');
var bookFormSave = $('.bookFormSave');
var bookFormCancel = $('.bookFormCancel');

var allBooks = $('.allBooks');

// Состояние формы - редактируем (edit) или добавляем (add)
var currentEditingBook = null;

// Вешаем обработчики клика по кнопке "Редактировать" для всех книг
$('.allBooks').on('click', function(e) {
  if ($(e.target).hasClass('bookEdit')) {
    var thisBook = $(e.target).parents('.singleBook');

    // Считываем поля, принадлежащие книге
    var valName = thisBook.find('.bookName').text();
    var valAuthor = thisBook.find('.bookAuthor').text();
    var valDate = + thisBook.find('.bookDate').text();
    var valImg = thisBook.find('.bookImg img').attr('src');

    // Запоминаем текущую редактируемую ноду в глобальной переменной,
    // доставаемой из замыкания
    currentEditingBook = thisBook;


    // Показываем форму редактировния
    bookForm.removeClass('add').addClass('edit');
    bookForm.show();

    // Вставляем в форму актуальные значения
    bookForm.find('[name="bookName"]').val(valName);
    bookForm.find('[name="bookAuthor"]').val(valAuthor);
    bookForm.find('[name="bookDate"]').val(valDate);
    bookForm.find('[name="bookImg"]').val(valImg);
  }
})

// Показать форму редактирования/добавления книги
showBookFormBtn.click(function() {
  bookForm.removeClass('edit').addClass('add');
  bookForm.show();
});

// Скрыть форму редактирования/добавления книги
bookFormCancel.click(function() {
  bookForm.hide();
});

// Добавление книги
bookFormAdd.click(function() {
  var newBook = $('.singleBook').first().clone();

  // Берем значения всех полей
  var valName = $('[name="bookName"]').val();
  var valAuthor = $('[name="bookAuthor"]').val();
  var valDate = + $('[name="bookDate"]').val();
  var valImg = $('[name="bookImg"]').val();

  // Валидация

  if ( !valName || !valAuthor || !valDate || !valImg ) {
    alert('Какое-то из полей не заполнено или заполнено неверно!');
    return;
  }

  if (valDate < 1000 || valDate > (new Date()).getFullYear() ) {
    alert('Дата выпуска должна быть не ранее 1000 и не позже сегодняшнего года!');
    return;
  }

  if ( !/.*\.(png|jpg|jpeg|svg|gif)$/.test(valImg) ) {
    alert('Формат изображения должен быть один из допустимых: png|jpg|jpeg|svg|gif');
    return;
  }

  // Добавление ноды с новой книгой
  newBook.find('.bookName').text(valName);
  newBook.find('.bookAuthor').text(valAuthor);
  newBook.find('.bookDate').text(valDate);
  newBook.find('.bookImg').attr('src', valImg);

  allBooks.append(newBook);

  $('[name="bookName"]').val('');
  $('[name="bookAuthor"]').val('');
  $('[name="bookDate"]').val('');
  $('[name="bookImg"]').val('');

  bookForm.hide();
});

// Сохранение отредактированной книги
bookFormSave.click(function(e) {
  // Берем значения всех полей
  var valName = $('[name="bookName"]').val();
  var valAuthor = $('[name="bookAuthor"]').val();
  var valDate = + $('[name="bookDate"]').val();
  var valImg = $('[name="bookImg"]').val();

  // Вставляем их в текущую редактируемую книгу
  currentEditingBook.find('.bookName').text(valName);
  currentEditingBook.find('.bookAuthor').text(valAuthor);
  currentEditingBook.find('.bookDate').text(valDate);
  currentEditingBook.find('.bookImg').attr('src', valImg);

  // Скрываем форму редактирования
  bookForm.hide();
});

//Удаление выбранной книги
$('.allBooks').on('click', function(e) {
  if ($(e.target).hasClass('bookRemove')) {
    var thisBook = $(e.target).parents('.singleBook');

    thisBook.empty();
    }
  });