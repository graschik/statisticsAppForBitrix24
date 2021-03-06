﻿# Требования к проекту
### Содержание
  1. [Введение](#1) <br>
    1.1 [Назначение](#1.1) <br>
    1.2 [Бизнес-требования](#1.2) <br>
      1.2.1 [Исходные данные](#1.2.1) <br>
      1.2.2 [Границы проекта](#1.2.2) <br>
    1.3 [Аналоги](#1.3) <br>
  2. [Требования пользователей](#2) <br>
    2.1 [Программные интерфейсы](#2.1) <br>
    2.2 [Интерфейс пользователя](#2.2) <br>
    2.3 [Характеристики пользователей](#2.3) <br>
      2.3.1 [Классы пользователей](#2.3.1) <br>
      2.3.2 [Аудитория приложения](#2.3.2) <br>
    2.4 [Предположения и зависимости](#2.4) <br>
  3. [Системные требования](#3) <br>
    3.1 [Функциональные требования](#3.1) <br>
      3.1.1 [Вход в приложение. ](#3.1.1) <br>
      3.1.2 [Страница просмотра статистики по всей компании. ](#3.1.2) <br>
      3.1.3 [Страница просмотра статистики по конкретному сотруднику. ](#3.1.3) <br>
      3.1.4 [Раздел изменения плана продаж.](#3.1.4) <br>
      3.1.5 [Дополнительный функционал.](#3.1.5) <br>
          3.2 [Нефункциональные требования](#3.2) <br>
      3.2.1 [Атрибуты качества](#3.2.1) <br>
      3.2.2 [Требования к безопастности](#3.2.2) <br>
      3.2.3 [Внешний интерфейс](#3.2.3) <br>
      3.2.4 [Ограничения](#3.2.4) <br>

### 1 Введение <a name="1"></a>
#### 1.1 Назначение <a name="1.1"></a>
<p align="justify">Данный документ описывает функциональные и нефункциональные требования к веб-приложению "Статистика продаж". Приложение является встраиваемым внешним решением для crm системы Битрикс24. Приложение предназначено для руководителей любого бизнеса, ведущего свои продажи через битрикс24, позволяет проводить быструю сквозную аналитику работы отдела продаж по всем ключевым показателям. </p>

#### 1.2 Бизнес-требования <a name="1.2"></a>
##### 1.2.1 Исходные данные <a name="1.2.1"></a>
<p align="justify">В последние годы бизнес диктует новые условия и веяния, одним из них является автоматизация ведения продаж. Crm системы становятся все более популярными т.к позволяют существенно сократить временные затраты на этапе взаимодействия клиента и продавца услуги. Одной из таких систем является битрикс24, разработка расширений под битрикс24 является перспективной нишей на данный момент. </p>

##### 1.2.2 Границы проекта <a name="1.2.2"></a>
<p align="justify">Приложение можно страивать в битрикс24 любой организации. Оно собирается статистику по работе отдела продаж, строит графики, таблицы и диаграммы на основании этих данных и позволяется администратору производить анализ работы его компании</p>

#### 1.3 Аналоги <a name="1.3"></a>
Непосредственных аналогов по функционалу   для  приложения  в marketplace(магазин приложений) bitrix24 нет, либо эти приложения находятся в закрытом доступе. Части функционала есть в «заводских» модулях crm, таких как «старт», «сотрудники», однако комплексного решения на данный момент я не обнаружил.

### 2. Требования пользователей <a name="2"></a>
#### 2.1 Программные интерфейсы <a name="2.1"></a>
  - Должен быть реализован сбор статистики из crm; 
  - Должен быть реализован подсчет ключевых показателей продаж, таких как количество лидов, счетов, сделок, процент выполнения плана, подсчет конверсии и акцептации;
  - Должен быть реализован вывод статистики в графиках и таблицах;
  -Реализован функционал выставление и изменения плана продаж для сотрудников.

#### 2.2 Интерфейс пользователя <a name="2.2"></a>
- Главный экран выгрузки статистики в приложение.
  ![HomePage](mockups/firstpage.png)
- Страница изменения плана
  ![plan]( mockups/plan.png)
- Страница статистики по всей компании
  ![generalstat]( mockups/gs.png)
- Страница вывода статистики по сотрудникам
  ![selfstat]( mockups/ss.png)

#### 2.3 Характеристики пользователей <a name="2.3"></a>
##### 2.3.1 Классы пользователей <a name="2.3.1"></a>
| Класс | Описание |
|:---|:---|
| Анонимные пользователи | Нет доступа к приложению|
| Зарегистрированные пользователи | Авторизованные пользователи, с подтвержденными правами в битрикс24. Имеют доступ к полному функционалу в рамках своего профиля |
| Администраторы | Пользователи, которые авторизовались специальным способом и имеют доступ ко всей информации. В том числе к выставлению и изменению плана продаж. |

##### 2.3.2 Аудитория приложения <a name="2.3.2"></a>
<p align="justify">Аудитория представляет из себя людей работающих в бизнесах, которые использую внутри своей компании битрикс24. Предназначены для руководителей, администраторов, менеджеров, в обязанность которых входит аналитика работы специалистов отдела продаж. Приложение существенно сокращает их временные затраты на ручной подсчет статистики и построении аналитических графиков в BI-системах. </p>

#### 2.4 Предположения и зависимости <a name="2.4"></a>
<p align="justify">Приложение должно быть максимально универсальным , не зависеть от тематики конкретного бизнеса. Исключить зависимость от выхода новых версий crm и каких-либо внешних сервисов. </p>

### 3 Системные требования <a name="3"></a>
Наличие последних версий браузера и битрикс24. 
#### 3.1 Функциональные требования <a name="3.1"></a>
##### 3.1.1 Страница просмотра статистики по всей компании. <a name="3.1.1"></a>
**Описание.** Пользователь может войти в приложение по прямой ссылки, при условии, что он зарегистриарован в битрикс24, и  для данного пользователя выданы соответствующие права в панели администратора crm.

##### 3.1.2 Страница просмотра статистики по всей компании.<a name="3.1.2"></a>
 Доступны: 
- select с выбором отдела; 
- календарь для выбора периода сбора статистики.

| Тип отображения | Предназначение |
|:---|:---|
| Таблица| Наглядный вывод средних значений по компании по каждому показателю статистики .|
|Круговая диаграмма | Выполнение плана продаж в процентах.|
| Столбиковые диаграммы| Сравнивать сотрудников по среднему чеку, проценту акцептации, конверсии. |
| Линейная диаграмма. | Хорошо видно падение/увеличение таких показателей, как количество лидов, закрытых сделок, заведённых счётов по месяцам или по годам. |

##### 3.1.3 Раздел изменения плана продаж.<a name="3.1.3"></a>
**Описание.** Редактирование плана продаж доступно только для пользователей битрикс 24 с правами администратора. Сотрудники выводятся списком, с возможностью редактировать план для каждого сотрудника. Также имеется отдельное поле ввода "общий план".


##### 3.1.4 Страница просмотра статистики по конкретному сотруднику.  <a name="3.1.4"></a>
**Описание.** Статистические показатели такие же, как для общей статистики, однако данные выбираются по конкретному специалисту.<br>
**Требование.** Для выбора сотрудника - input с автодополнением из базы данных сотрудников. 
##### 3.1.5 Дополнительные возможности.  <a name="3.1.5"></a>
**Описание.**
Для каждого графика есть возможности:
 - сохранить на компьютер; 
- конвертировать в PDF , jpg;
- вывести на печать прямо из браузера.

#### 3.2 Дополнительный функционал<a name="3.2"></a>
##### 3.2.1 Атрибуты качества <a name="3.2.1"></a>
<p align="justify">Проект должен быть небольшим (иметь менее 10 разновидностей страниц), удобным (доступ к основным функциям приложения не более чем за две операции) и управляемым (пользователь может отменить все свои действия).</p>

##### 3.2.2 Требования к безопастности <a name="3.2.2"></a>
<p align="justify"> Приложение работает в конфиденциальными данными компании, большой упор сделан на то, чтобы не выносить статистику на сторонние сервисы и работать в рамках приватных баз данных конкретной компании, что поможет обезопасить от нежелательного перехвата синформации.  </p>

##### 3.2.3 Внешний интерфейс <a name="3.2.3"></a>
Приложение должно:
- быть разработано в одном стиле;
- название кнопок в интерфейсе максимально понятно отражает функционал;
- все графики и таблицы имеют подписи.

##### 3.2.4 Ограничения <a name="3.2.4"></a>
<p align="justify">Вся статистика обрабатывается исключительно на сервере, в браузере только построение графиков. Доступ только для подтвержденных пользователей. </p>

