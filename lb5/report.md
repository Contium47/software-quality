# Лабораторна робота №5 
## Інтеграційне тестування компонентів та зовнішніх систем 
**Виконав: Гринь Артем Романович**    
**Група: 6.1213-1**   
**Дата: 9.11.2026** 

## 1. Component Integration Testing 
### Test Object 
`CartService <-> shop-utils` 

### Scenario 1 — Discount 
Test Data: 
- item 1: price = 100; 
- item 2: price = 200; 
- discount = 10%. 

Expected Result: 
`270` 

Actual Result: 
`270` 

Result: 
`Pass` 

### Scenario 2 — Invalid Discount 
Test Data: 
- item: price = 100; 
- discount = 110%. 

Expected Result: 
`Discount must be between 0 and 100` 

Actual Result: 
`Discount must be between 0 and 100` 

Result: 
`Pass` 

## 2. System Integration Testing 
### Test Object 
`ExternalEchoGateway <-> Postman Echo` 

### Test Data 
- orderId = `ORD-001`; 
- total = `270`. 

### Expected Result 
```json 
{ 
"orderId": "ORD-001", 
"total": 270 
}
```

### Actual Result
```json
{ 
"orderId": "ORD-001", 
"total": 270 
}
```

Result:
`Pass` 

Висновки: У ході лабораторної роботи №5 було успішно опановано відмінності між Component Integration та System Integration Testing. Створено компонентні інтеграційні тести для зв'язки CartService <-> shop-utils (перевірка розрахунку знижки та обробки помилок) і системний інтеграційний тест для ExternalEchoGateway при взаємодії з HTTP-сервісом Postman Echo. Усі 40 тестів у проєкті пройшли успішно зі статусом PASS.

## Контрольні питання
1. Що таке Integration Testing? перевірка правильної взаємодії між компонентами або системами
2. Що є Test Object у Component Integration Testing? взаємодія між двома або більше компонентами
3. Чим Component Test відрізняється від Component Integration Test? component test перевіряє один компонент окремо, а component integration test - взаємодію між компонентами.
4. Чому успішні Unit Tests не гарантують правильної взаємодії компонентів? тому що unit tests перевіряють компоненти окремо, а помилки можуть виникати під час їхньої взаємодії.
5. Чому calculateDiscount() не підміняється mock-функцією? тому що використовується реальна функція calculateDiscount() з shop-utils.js, без mock-підміни.
6. Чому negative integration test може завершитися Pass? тому що тест очікує помилку, і якщо вона виникає правильно, результат буде pass
7. Що таке System Integration Testing? перевірка взаємодії нашої системи із зовнішнім сервісом через http
8. Чим System Integration Testing відрізняється від Component Integration Testing? component integration testing перевіряє взаємодію компонентів усередині системи, а system integration testing — взаємодію із зовнішніми системами
9. Для чого Test може мати timeout? щоб обмежити час очікування відповіді та не дозволити тесту виконуватися нескінченно
10. Які зовнішні фактори можуть впливати на System Integration Test? інтернет-з'єднання, dns, доступність зовнішнього сервісу та швидкість відповіді мережі