# 🪙 Crypto Dashboard

**Crypto Dashboard** — современное приложение для real-time мониторинга курсов криптовалют с возможностью персонализации и расширенной визуализации.

## 🚀 Цель проекта

- Отслеживание курсов топовых криптовалют в реальном времени
- Персонализация интерфейса и избранного
- Визуализация данных и интерактивные инструменты для анализа

---

## 📌 Функционал

### 1. Основные блоки

- **Главный экран**
  - Топ-10 монет по капитализации (сортировка по колонкам)
  - График изменения цены (ApexCharts)
- **Детальная страница**
  - История цены (1 день/неделя/месяц)
  - 3D-визуализация волатильности (Three.js + `react-three-fiber`)

### 2. Интерактив

- **Избранное**
  - Добавление в избранное (анимация: GSAP `scale`)
  - Локальное хранение (Zustand + `localStorage`)
- **Конвертер**
  - Перевод между валютами (BTC → USD, ETH → EUR и др.) с рекурсивными запросами


## 🛠 Технологии и библиотеки

| Часть         | Технологии и библиотеки                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- |
| **API**       | [Axios](https://axios-http.com/)                                                                    |
| **Графики**   | [ApexCharts](https://apexcharts.com/)                                                               |
| **3D**        | [Three.js](https://threejs.org/) + [react-three-fiber](https://docs.pmnd.rs/react-three-fiber)      |
| **Состояние** | [Zustand](https://zustand-demo.pmnd.rs/) + [React Query](https://tanstack.com/query/latest)         |
| **Анимации**  | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)                     |
| **UI**        | [Tailwind CSS](https://tailwindcss.com/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Тесты**     | [Vitest](https://vitest.dev/), [MSW](https://mswjs.io/)                                             |

---

## ⚡️ Быстрый старт

```bash
bun install
bun run dev
```
