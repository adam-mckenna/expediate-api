# 🏃 Expediate: a simple way to log your DQS

Expediate is a simple way for athletes to track their [Diet Quality Score](https://strengthrunning.com/2014/06/runners-diet-plan-matt-fitzgerald-interview/).

Matt Fitzgerald introduced the DQS system in his book, [Racing Weight](https://www.goodreads.com/book/show/7192581-racing-weight). The system aims to give athletes a rule-of-thumb way to measure the quality of their diets without tracking every calorie.

This app (ideally) makes it even easier: just dump everything you ate into a text field and let Expediate do the rest.

## 🥦 DQS Scoring

Fitzgerald's DQS follows a point-based system based on two factors:

1. The _quality_ of the food
2. The _quantity_ of the food

| **Food Type**         | **1st** | **2nd** | **3rd** | **4th** | **5th** | **6th** |
| --------------------- | ------: | ------: | ------: | ------: | ------: | ------: |
| **Fruits**            |       2 |       2 |       2 |       1 |       0 |       0 |
| **Vegetables**        |       2 |       2 |       2 |       1 |       0 |       0 |
| **Lean meats & fish** |       2 |       2 |       1 |       0 |       0 |      -1 |
| **Nuts & seeds**      |       2 |       2 |       1 |       0 |       0 |      -1 |
| **Whole grains**      |       2 |       2 |       1 |       0 |       0 |      -1 |
| **Dairy**             |       1 |       1 |       1 |       0 |      -1 |      -2 |
| **Refined grains**    |      -1 |      -1 |      -2 |      -2 |      -2 |      -2 |
| **Sweets**            |      -2 |      -2 |      -2 |      -2 |      -2 |      -2 |
| **Fried foods**       |      -2 |      -2 |      -2 |      -2 |      -2 |      -2 |
| **Fatty proteins**    |      -1 |      -1 |      -2 |      -2 |      -2 |      -2 |

## 🧑‍💻 Tech

This API is built using [Nest.js](https://docs.nestjs.com/).
