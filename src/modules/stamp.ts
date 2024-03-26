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
}
