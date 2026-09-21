# Лабораторна робота №2

## Проєктування тестів. Checklist, Test Cases та Decision Table

## Test Conditions

| ID | Test Condition |
|---|---|
| TCND-01 | Успішна авторизація валідного користувача |
| TCND-02 | Авторизація з неправильним Username |
| TCND-03 | Авторизація з неправильним Password |
| TCND-04 | Авторизація з порожнім Username |
| TCND-05 | Авторизація з порожнім Password |
| TCND-06 | Авторизація заблокованого користувача |

# Checklist

Успішна авторизація з валідними даними

Відмова в авторизації з неправильним Username

Відмова в авторизації з неправильним Password

Перевірка порожнього Username

Перевірка порожнього Password

Відмова в авторизації заблокованого користувача

### TC-LOGIN-01 – Успішна авторизація standard_user

**Type:** Positive

**Preconditions:**

- Відкрита сторінка Login SauceDemo
- Користувач не авторизований

**Test Data:**

- Username: standard_user
- Password: secret_sauce

**Steps:**

1. У поле Username ввести "standard_user"
2. У поле Password ввести "secret_sauce"
3. Натиснути кнопку Login

**Expected Result:**

Після введення "standard_user" і правильного пароля та натискання Login користувач успішно авторизується і переходить на сторінку Products.

**Actual Result:**

Користувач успішно авторизувався та перейшов на сторінку Products.

**Result:** Pass

### TC-LOGIN-02 – Відмова в авторизації з неправильним Password

**Type:** Negative

**Preconditions:**

- Відкрита сторінка Login SauceDemo
- Користувач не авторизований

**Test Data:**

- Username: standard_user
- Password: wrong_password

**Steps:**

1. У поле Username ввести "standard_user"
2. У поле Password ввести "wrong_password"
3. Натиснути кнопку Login

**Expected Result:**

Користувач не авторизується, відображається повідомлення "Epic sadface: Username and password do not match any user in this service".

**Actual Result:**

Користувач не авторизувався, відображається повідомлення "Epic sadface: Username and password do not match any user in this service".

**Result:** Pass

### TC-LOGIN-03 – Відмова в авторизації заблокованого користувача

**Type:** Negative

**Preconditions:**

- Відкрита сторінка Login SauceDemo
- Користувач не авторизований

**Test Data:**

- Username: locked_out_user
- Password: secret_sauce

**Steps:**

1. У поле Username ввести "locked_out_user"
2. У поле Password ввести "secret_sauce"
3. Натиснути кнопку Login

**Expected Result:**

Користувач не авторизується, відображається повідомлення "Epic sadface: Sorry, this user has been locked out".

**Actual Result:**

Користувач не авторизувався, відображається повідомлення "Epic sadface: Username and password do not match any user in this service".

**Result:** Fail

## Decision Table

| Умова | R1 | R2 | R3 | R4 | R5 |
|---|---|---|---|---|---|
| Username є у списку валідних? | T | T | F | T | F |
| Password правильний? | T | T | T | F | F |
| Користувач заблокований? | F | T | - | - | - |
| Результат | A1 | A2 | A3 | A3 | A3 |

**Позначення:**

- T — True
- F — False
- - — умова не має значення
- A1 — перехід на сторінку Products
- A2 — відмова в авторизації через заблокованого користувача
- A3 — відмова в авторизації через неправильні облікові дані

### Покриття Test Cases

| Test Case | Правило Decision Table |
|---|---|
| TC-LOGIN-01 | R1 |
| TC-LOGIN-02 | R4 |
| TC-LOGIN-03 | R2 |

**Непокриті правила:**

- R3 — invalid Username + valid Password
- R5 — invalid Username + invalid Password

### Результати виконання Test Cases

| Test Case | Actual Result | Result |
|---|---|---|
| TC-LOGIN-01 | Користувач успішно авторизувався та перейшов на сторінку Products. | Pass |
| TC-LOGIN-02 | Користувач не авторизувався, відображається повідомлення "Epic sadface: Username and password do not match any user in this service". | Pass |
| TC-LOGIN-03 | Користувач не авторизувався, відображається повідомлення "Epic sadface: Username and password do not match any user in this service". | Fail |

## Висновок

У ході лабораторної роботи було визначено Test Conditions, сформовано Checklist та три Test Cases для перевірки авторизації. Також було побудовано Decision Table та виконано тестування в SauceDemo. За результатами виконання два тест-кейси пройшли успішно, один завершився зі статусом Fail через невідповідність фактичного результату очікуваному.

## Контрольні питання

1. Що таке Test Basis і навіщо він потрібний?
Основа для визначення очікуваних результатів.

2. Чим Test Condition відрізняється від Test Case? 
Test Condition - що перевірити 
Test Case - як перевірити

3. На яке питання відповідає Test Analysis? 
Що

4. На яке питання відповідає Test Design?
Як

5. Для чого використовується checklist? 
Швидкий список перевірок без деталей

6. Чому checklist не завжди може замінити детальний test case? 
Відсутні кроки та тестові дані

7. Чим positive test відрізняється від negative test? 
Positive це валідні дані
Negative - невалідні

8. Чому negative test може мати результат Pass? 
Відповідає вимогам

9. Для чого використовується Decision Table? 
перевірка комбінацій умов

10. Навіщо порівнювати Expected Result та Actual Result? 
визначення відповідності вимогам

11. Що означають Pass та Fail? 
збіг та дефект