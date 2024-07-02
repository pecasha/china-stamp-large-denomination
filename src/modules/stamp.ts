import database from "@/data/stamp.json";

export interface StampItem {
    /** 票名 */
    title: string;
    /** 图名 */
    name?: string;
    /** 图序 */
    number?: string;
    /** 票面图片地址 */
    img: string;
    /** 图片长宽比 */
    imgRatio: number;
    /** 发行日期 */
    date: string;
    /** 面值 */
    value: number;
    /** 尺寸 */
    size: string;
    /** 特殊形状 */
    shape?: string;
    /** 邮票类型 */
    type: string;
    /** 资料来源 */
    source?: string;
}

export default class Stamp {
    #data: StampItem[] = database;

    get data() {
        return this.#data;
    }

    get dataByValue() {
        return Object.groupBy(this.#data, ({value}) => value);
    }

    get dataByType() {
        return Object.groupBy(this.#data, ({type}) => type);
    }

    get dataBySize() {
        return Object.groupBy(this.#data, ({size}) => size);
    }
}
