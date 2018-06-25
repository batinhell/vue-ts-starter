import {UI} from '../../app/UI';
import Component from 'vue-class-component';
import {DataPoint} from 'highcharts';
import {Portfolio} from '../../types/types';
import {StoreType} from '../../vuex/storeType';
import {namespace} from 'vuex-class/lib/bindings';
import {BigMoney} from '../../types/bigMoney';
import {Decimal} from 'decimal.js';
import {Watch} from "vue-property-decorator";

const MainStore = namespace(StoreType.MAIN);

@Component({
    // language=Vue
    template: `
        <pie-chart :data="chartData" :balloon-title="portfolio.portfolioParams.name"></pie-chart>
    `
})
export class StockPieChart extends UI {

    @MainStore.Getter
    private portfolio: Portfolio;

    private chartData: DataPoint[] = [];

    private created(): void {
        this.chartData = this.doStockPieChartData();
    }

    @Watch('portfolio')
    private onPortfolioChange(): void {
        this.chartData = this.doStockPieChartData();
    }

    private doStockPieChartData(): DataPoint[] {
        const data: DataPoint[] = [];
        this.portfolio.overview.stockPortfolio.rows.filter(value => value.currCost != '0').forEach(row => {
            data.push({
                name: row.stock.shortname,
                y: new Decimal(new BigMoney(row.currCost).amount.abs().toString()).toDP(2, Decimal.ROUND_HALF_UP).toNumber()
            });
        });
        return data;
    }
}