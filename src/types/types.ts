export type _portfolioRow = {
    /** Прибыль */
    profit: string,
    /** Процентная доля строки в от общего */
    percCurrShare: string,
    /** Текущая стоимость */
    currCost: string,

    assetType: string
}

export type AssetRow = _portfolioRow & {
    type: string
}

export type TradeRow = {
    id: string,
    date: string,
    operation: string,
    operationLabel: string,
    currency: string,
    signedTotal: string
    ticker?: string,
    quantity: string,
    price: string,
    fee: string,
    note?: string
}

export type _shareRow = _portfolioRow & {
    /** Стоимость продаж */
    sCost: string,
    /** Стоимость покупок */
    bCost: string,
    /** Стоимость вложений */
    initCost: string,
    /** Средневзвешенная сумма инвестиций */
    avgInvested: string,
    /** Процент доходности рассчитанный с учетом средневзвешенной суммы инвестиций, выраженный в процентах годовы (сложный процент) */
    yearYield: string,
    /** Срок владения бумагой */
    ownedDays: string,
    /** Прибыль в процентах */
    percProfit: string,
    /** Текущая доля */
    percCurrShare: string,
    /** Прибыль обусловленная разницей курсовой стоимости актива */
    rateProfit: string,
    /** Процент прибыли (доходность), обусловленный разницей курсовой стоимости актива */
    rateProfitPercent: string,
    /** Прибыль от сделок по ценной бумаге */
    exchangeProfit: string,
    /** Процент прибыли от сделок по ценной бумаге */
    exchangeProfitPercent: string,
    /** Суммарная стоимость всего портфеля */
    summaryCost: string,
    /** Суммарная комиссия по операциям купли/продажи */
    summFee: string,
    /** Комиссия по покупкам */
    buyFee: string,
    /** Комиссия по продажам */
    sellFee: string,
    /** Дневная прибыль/убыток по позиции */
    dailyPl: string,
    /** Дневная прибыль/убыток по позиции в % */
    dailyPlPercent: string,
    /**
     * Количество значащих разрядов для округления средней цены.
     * Для тех случаев когда нет этого значения у самой акции или при конвертации валют
     */
    decimals: string
}

export type StockPortfolioSumRow = _shareRow & {
    /**
     * Текущая цена. Храним именно значение, а не используем из сущности Stock, чтобы не было расхождений, потому что кэш бумаг обновляется чаще
     * чем кэш портфеля
     */
    currPrice: string,
    /** Прибыль от начисленных дивидендов */
    profitFromDividends: string,
    /** Общая доходность от начисленных дивидендов */
    profitFromDividendsPercent: string
};

export type BondPortfolioSumRow = _shareRow & {
    /**
     * Текущая цена. Храним именно значение, а не используем из сущности Bond, чтобы не было расхождений, потому что кэш бумаг обновляется чаще
     * чем кэш портфеля
     */
    currPrice: string,
    /** Прибыль от выплаты купонов */
    profitFromCoupons: string,
    /** Прибыль от выплаты купонов в процентах */
    profitFromCouponsPercent: string,
    /** Суммарный выплаченный НКД при покупке облигаций */
    buyNkd: string,
    /** Полученный при продаже НКД */
    sellNkd: string
}

export type StockPortfolioRow = StockPortfolioSumRow & {

    // private StockTarget stockTarget = new StockTarget();
    id: string,
    stock: Stock,
    quantity: string,
    /** Средняя цена покупки */
    avgBuy: string,

    avgBuyClean: string,

    firstBuy: string,

    lastBuy: string,
    /** Признак того, что позиция по бумаге короткая */
    isShort: string,
    /** Количество полных лотов по бумаге в портфеле */
    lotCounts: string
}

export type BondPortfolioRow = BondPortfolioSumRow & {
    /** Идентификатор */
    id: string,
    /** Облигация */
    bond: Bond,
    /** Количество */
    quantity: string,
    /** Средняя цена покупки */
    avgBuy: string,
    /** Средняя без комиссий */
    avgBuyClean: string,
    /** Абсолютное значение цены (покупки или продажи) */
    absoluteAvgPrice: string,
    /**
     * Используется для отбражения текущего номинала. Храним именно значение, а не используем из сущности Share, чтобы не было расхождений,
     * потому что кэш бумаг обновляется чаще чем кэш портфеля
     */
    currNominal: string,
    /**
     * Используется для отбражения текущего номинала. Храним именно значение, а не используем из сущности Share, чтобы не было расхождений,
     * потому что кэш бумаг обновляется чаще чем кэш портфеля
     */
    absolutePrice: string,
    /** Дисконт */
    amortization: string,
    nominal: string,
    /** Признак что связанная облигация погашена */
    repaid: string,

    checked: string,

    firstBuy: string,

    lastBuy: string
}

export type Overview = {
    dashboardData: DashboardData,
    assetRows: AssetRow[],
    stockPortfolio: StockPortfolio,
    bondPortfolio: BondPortfolio
}

export type StockPortfolio = {
    sumRow: StockPortfolioSumRow,
    rows: StockPortfolioRow[]
}

export type BondPortfolio = {
    sumRow: BondPortfolioSumRow,
    rows: BondPortfolioRow[]
}

export type Portfolio = {
    id: string,
    portfolioParams: PortfolioParams,
    trades: TradeRow[],
    overview: Overview
}

export type TableHeader = {
    text: string,
    align?: string,
    sortable?: boolean,
    value: string
}

export type DashboardData = {
    currentCost: string,
    currentCostInAlternativeCurrency: string,
    profitWithoutDividendsAndCoupons: string,
    profit: string,
    percentProfit: string,
    profitWithoutFees: string,
    yearYield: string,
    yearYieldWithoutDividendsAndCoupons: string,
    dailyChanges: string,
    dailyChangesPercent: string
}

export type DashboardBrick = {
    name: string,
    mainValue: string,
    secondValue: string,
    secondValueDesc?: string,
    color: string,
    icon: string
}

export type PortfolioParams = {
    id: string,
    name: string,
    access: string,
    fixFee: string,
    viewCurrency: string,
    type: string,
    openDate: string,
    combined: boolean
}

export class ClientInfo {

    token: string;
    user: Client
}

export type Client = {
    id: string,
    username: string,
    email: string,
    tariff: string,
    paidTill: string,
    currentPortfolioId: string,
    portfolios: PortfolioParams[],
    referralAwardType: string,
    promoCode: string
}

export type Share = {
    /** Идентификатору бумаги в системе */
    id: string;

    price: string,

    lotsize: string,
    /** Количество значащих разрядов */
    decimals: string;
    /** Код валюты */
    currency: string;
    /** ISIN-номер */
    isin: string;
    /** Короткое название */
    shortname: string;
    /** Изменение за день */
    change: string;
    /** Доска, где торгуется бумага */
    boardName: string;
    /** Название */
    name: string;
    /** Тикер */
    ticker: string;
}

/**
 * Сущность акции
 */
export type Stock = Share & {
    /** Текущая цена */
    price: string;
    /** Номер выпуска */
    regNumber: string;
    /** Размер лота */
    lotsize: number;
    /** Рейтинг */
    rating: string;
    /** Максимальный рейтинг по акции */
    maxRating: string;
    /** Последний рейтинг по акции */
    lastRating: string;
    /** Интервал */
    interval: string;
    /** Сайт */
    site: string;
    /** Див.доходность за три года */
    yield3: string;
    /** Див.доходность за пять лет */
    yield5: string;
    /** Див.доходность за все время */
    yieldAll: string;
    /**доля акции в индексе */
    weight: string;
    color: string;
    /** Признак что акция привилегированная */
    privileged: string;
    sector: Sector;
    /** Кол-во акций в обращении */
    issueSize: string;
    /** Рыночная капитализация */
    issueCapitalization: string;
    /** Идентификатор эмитента на сайте биржи */
    moexId: string;
}

export type Sector = {
    name: string;
    parent: Sector;
    root: boolean;
}

export type Bond = Share & {
    /** Идентификатор облигации */
    secid: string;
    /** Доходность облигации */
    yield: string;
    /** Размер купона */
    couponvalue: string;
    /** Дата следующего купона */
    nextcoupon: string;
    /** Текущий НКД */
    accruedint: string;
    /** Текущая цена */
    prevprice: string;
    /** Дата погашения */
    matdate: string;
    /** Дюрация */
    duration: string;
    /** Название облигации */
    secname: string;
    /** Номинал облигации */
    facevalue: string;
    /** Номер выпуска */
    regnumber: string;
    /** Отформатированное значение номинала */
    formattedFacevalue: string;
    /** Признак что облигация уже погашена на данный момент */
    isRepaid: boolean;
    /** Абсолютная текущая цена облигации без учета НКД */
    absolutePrice: string;
}

export type LoginRequest = {
    username: string,
    password: string
}

export type LineChartItem = {
    date: string,
    amount: string,
    stockAmount: string,
    bondAmount: string,
    year: string,
    lastItemOfTheYear: string
}

export type EventChartData = {
    date: string,
    backgroundColor: string,
    description: string,
    text: string
}

export type HighStockEventData = {
    x: number,
    title: string,
    text: string
}

export type HighStockEventsGroup = {
    type: string,
    data: HighStockEventData[]
    onSeries: string,
    shape: string,
    color: string,
    fillColor: string,
    stackDistance: number,
    width: number
}

export type SectorChartData = {
    data: any[],
    categories: string[]
}

export type CombinedInfoRequest = {
    ids: string[],
    viewCurrency: string
}

export type TradeData = {
    /** Тикер */
    ticker: string,
    /** Дата */
    date: Date,
    /** Количество */
    quantity: number,
    /** Цена */
    price: string,
    /** Номинал */
    facevalue: string,
    /** НКД */
    nkd: string,
    /** Признак начисления на одну бумагу */
    perOne: boolean,
    /** Комиссия */
    fee: string,
    /** Заметка */
    note: string,
    /** Признак списания/зачисления денег */
    keepMoney: boolean,
    /** Сумма денег для списания/зачисления */
    moneyAmount: string,
    /** Валюта сделки */
    currency: string
}