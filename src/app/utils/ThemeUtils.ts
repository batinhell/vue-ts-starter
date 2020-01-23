/*
 * STRICTLY CONFIDENTIAL
 * TRADE SECRET
 * PROPRIETARY:
 *       "Intelinvest" Ltd, TIN 1655386205
 *       420107, REPUBLIC OF TATARSTAN, KAZAN CITY, SPARTAKOVSKAYA STREET, HOUSE 2, ROOM 119
 * (c) "Intelinvest" Ltd, 2019
 *
 * СТРОГО КОНФИДЕНЦИАЛЬНО
 * КОММЕРЧЕСКАЯ ТАЙНА
 * СОБСТВЕННИК:
 *       ООО "Интеллектуальные инвестиции", ИНН 1655386205
 *       420107, РЕСПУБЛИКА ТАТАРСТАН, ГОРОД КАЗАНЬ, УЛИЦА СПАРТАКОВСКАЯ, ДОМ 2, ПОМЕЩЕНИЕ 119
 * (c) ООО "Интеллектуальные инвестиции", 2019
 */

import {StoreKeys} from "../types/storeKeys";
import {BROWSER} from "../types/types";
import {CommonUtils} from "./commonUtils";

export class ThemeUtils {

    private static readonly CSS_STYLES = `
    img:not([src*=\".svg\"]),video {
        filter: invert(100%);
    }
    .ii--green-markup {
        filter: invert(100%);
    }
    .ii--red-markup {
        filter: invert(100%);
    }
    .green--text {
        filter: invert(100%);
    }
    .red--text {
        filter: invert(100%);
    }
    .v-overlay--active:before {
        background-color: #ffffff !important;
    }

    /* new */
    .dashboard-wrap,
    .profile,
    .theme--light.v-navigation-drawer,
    .theme--light.v-sheet,
    .theme--light.v-table tbody tr,
    .adviser-wrap .adviser-diagram-section,
    .trades-filter,
     .v-calendar-weekly__day {
        background: #2C3040 !important;
    }

    .v-content__wrap,
    .header-first-card,
    .theme--light.v-footer,
    .submenu-v-menu,
    .custom-tooltip-wrap,
    .theme--light.v-list,
    .v-input--switch__track,
     .v-calendar-weekly__head,
       .events-calendar-wrap .v-calendar-weekly__head .v-outside {background: #21232F !important}

    .active-link, .wrap-list-menu .v-list__tile:hover,
    .header-first-card__title-text,
    .layout,
    .v-expansion-panel__header,
    .wrapper-content-panel,
    .wrapper-list-reference a:not(:hover),
    .fs13, .fs14,
    .submenu-v-menu .v-list__tile,
    .theme--light.v-icon,
    .data-table thead tr:first-child th,
    .theme--light.v-data-iterator .v-data-iterator__actions thead tr:first-child th,
    .theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon thead tr:first-child th,
    .inplace-custom-input input, .portfolio-rows-filter__settings .theme--light.v-label, .portfolio-rows-filter__settings .v-label{color: #fff !important}

    .data-table tbody .selectable td,
    .custom-tooltip-wrap,
    .theme--light.v-list,
    .theme--light.v-data-iterator .v-data-iterator__actions tbody .selectable td,
    .theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon tbody .selectable td,
    .theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea,
    .theme--light.v-table,
    .v-datatable.v-table.theme--light .selectable a,
    .events__card-title,
    .eventsAggregateInfo .item-block,
    .theme--light.v-sheet,
    .events-calendar-wrap .calendar-events-title,
    .theme--light.v-calendar-weekly .v-calendar-weekly__day,
    .theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday.v-past {color: #fff}

    .theme--light.v-label {color: #fff; opacity: 0.7}

    .active-link, .wrap-list-menu .v-list__tile:hover,
    .theme--dark.v-btn:not(.v-btn--icon):not(.v-btn--flat),
    .data-table thead tr:first-child th,
    .theme--light.v-data-iterator .v-data-iterator__actions thead tr:first-child th,
    .theme--light.v-expansion-panel .v-expansion-panel__container .v-expansion-panel__header .v-expansion-panel__header__icon .v-icon thead tr:first-child th,
    .adviser-wrap .adviser-diagram-section .left-section .flex, .adviser-wrap .adviser-diagram-section .right-section .flex,
     .eventsAggregateInfo .item-block,
      .events-calendar-wrap .calendar-events-title {background: #252A35 !important}

    .theme--light.v-table tbody tr:not(:last-child),
     .theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday,
      .theme--light.v-calendar-weekly .v-calendar-weekly__day {border-color: #181a33;}

    .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {background: #3b6ec9;}

    .arrow-up .dashboard-summary-income-icon {
        background: #405242;
    }

    .arrow-down .dashboard-summary-income-icon {
        background: #61343f;
    }

    .highcharts-legend text,
    .highcharts-axis-labels text {fill: #fff !important}
    .highcharts-background {fill: #252A35 !important}
    .highcharts-markers.highcharts-spline-series path {fill: #3B6EC9 !important}
    .highcharts-graph {stroke: #3B6EC9 !important}

    .highcharts-series .highcharts-point:nth-child(1) {fill: #4E4FA4 !important}
    .highcharts-series .highcharts-point:nth-child(2) {fill: #6B75C6 !important}
    .highcharts-series .highcharts-point:nth-child(3) {fill: #74D1F4 !important}
    .highcharts-series .highcharts-point:nth-child(4) {fill: #178BC6 !important}
    
    `;

    static setStyles(nightTheme: boolean): void {
        let stylesElement = document.getElementById(StoreKeys.THEME);
        if (!stylesElement) {
            stylesElement = document.createElement("style");
            stylesElement.id = "theme";
            document.head.appendChild(stylesElement);
        }
        stylesElement.innerHTML = nightTheme ? ThemeUtils.CSS_STYLES : "";
        stylesElement.setAttribute("media", nightTheme ? "screen" : "none");
    }

    static invertSupported(): boolean {
        const browserInfo = CommonUtils.detectBrowser();
        if (browserInfo.name === BROWSER.FIREFOX) {
            return false;
        }
        const prop = "filter";
        const el = document.createElement("test");
        const mStyle = el.style;
        el.style.cssText = prop + ":invert(100%)";
        return !!(mStyle as any)[prop];
    }
}
