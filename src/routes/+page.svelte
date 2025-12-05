<div class="page">
    <header>
        <div class="logo">
            <img src="/logo.png"
                 alt="中国大面值邮票图鉴">
            <section>
                <h1>中国大面值邮票图鉴<QuestionCircleOutline size="sm"/><Tooltip type="dark" placement="bottom-start">只收录带有荧光编码并且面值大于等于 2元 的邮票，不包含小型张。<br>从 2002年9月7日 发行的「雁荡山」特种邮票之后，所有的邮票都使用了荧光喷码</Tooltip></h1>
                <h2 class="tips">只收录带有荧光编码并且面值大于等于 2元 的邮票，不包含小型张 <QuestionCircleOutline class="cursor-pointer" size="sm"/><Tooltip type="dark" placement="bottom">从 2002年9月7日 发行的「雁荡山」特种邮票之后，所有的邮票都使用了荧光喷码</Tooltip></h2>
            </section>
        </div>
        <div class="menu">
            <Dropdown triggeredBy=".sort-filter"
                      placement="bottom-end"
                      arrow>
                <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>排序</DropdownItem>
                <Dropdown placement="left-start"
                          arrow>
                    <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>发行时间</DropdownItem>
                    <Dropdown placement="left-start"
                              arrow>
                        <DropdownItem class="flex items-center text-base ps-3 pe-2"><Radio class="text-base" name="sort" bind:group={sort} value={0} color="red" onclick={filterUpdate}>降序<ArrowDownOutline size="md"/></Radio></DropdownItem>
                        <DropdownItem class="flex items-center text-base ps-3 pe-2"><Radio class="text-base" name="sort" bind:group={sort} value={1} color="red" onclick={filterUpdate}>升序<ArrowUpOutline size="md"/></Radio></DropdownItem>
                    </Dropdown>
                    <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>面值</DropdownItem>
                    <Dropdown placement="left-start"
                              arrow>
                        <DropdownItem class="flex items-center text-base ps-3 pe-2"><Radio class="text-base" name="sort" bind:group={sort} value={2} color="red" onclick={filterUpdate}>降序<ArrowDownOutline size="md"/></Radio></DropdownItem>
                        <DropdownItem class="flex items-center text-base ps-3 pe-2"><Radio class="text-base" name="sort" bind:group={sort} value={3} color="red" onclick={filterUpdate}>升序<ArrowUpOutline size="md"/></Radio></DropdownItem>
                    </Dropdown>
                </Dropdown>
                <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>筛选</DropdownItem>
                <Dropdown placement="left-start"
                          arrow>
                    <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>类型</DropdownItem>
                    <Dropdown placement="left-start"
                              arrow>
                        {#each filterTypeMap as item}
                            <DropdownItem class="flex items-center text-base px-4"><Checkbox class="text-base" checked={filterType.includes(item)} onchange={event => filterChange(filterType,event,item)}>{item}</Checkbox></DropdownItem>
                        {/each}
                    </Dropdown>
                    <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>面值</DropdownItem>
                    <Dropdown placement="left-start"
                              arrow>
                        {#each filterValueMap as item}
                            <DropdownItem class="flex items-center text-base px-4"><Checkbox class="text-base" checked={filterValue.includes(item)} onchange={event => filterChange(filterValue,event,item)}>{item}元</Checkbox></DropdownItem>
                        {/each}
                    </Dropdown>
                    <DropdownItem class="flex items-center text-base ps-2 pe-4"><ChevronLeftOutline size="lg"/>尺寸</DropdownItem>
                    <Dropdown placement="left-start"
                              arrow>
                        {#each filterSizeMap as item}
                            <DropdownItem class="flex items-center px-3"><Checkbox checked={filterSize.includes(item)} onchange={event => filterChange(filterSize,event,item)}>{item}</Checkbox></DropdownItem>
                        {/each}
                    </Dropdown>
                </Dropdown>
            </Dropdown>
            <div class="menu-button">
                <a class="github"
                   href="https://github.com/pecasha/china-stamp-large-denomination"
                   target={urlTarget}>
                    <GithubSolid size="lg" />
                </a>
                <div class="sort-filter">
                    <FilterOutline size="lg" />
                </div>
            </div>
        </div>
    </header>
    <hr class="scrollbar-border">
    <div class="list"
         bind:this={listEl}>
        {#each columns as column}
            <ul class="column">
                {#each column as item, index (item.img)}
                    <li transition:scale>
                        <img src="{stampImageUrlPrefix}{item.img}.png"
                             loading="lazy"
                             bind:this={imgEls[index]}
                             alt={item.name||item.title}
                             style="aspect-ratio:{item.imgRatio}">
                        <h1 class="title">{item.title}</h1>
                        {#if item.number||item.name}
                            <div class="name">
                                {#if item.number}
                                    <span class="tag">{item.number}</span>
                                {/if}
                                {#if item.name}
                                    <p>{item.name}</p>
                                {/if}
                            </div>
                        {/if}
                        <div class="denomination">
                            <b>{item.value}</b>
                            <p title="尺寸单位: 毫米"><RulerCombinedOutline size="sm"/>{item.size}</p>
                        </div>
                        <div class="type">
                            <span class="tag {item.type}">{item.type}</span>
                            <p title="发行时间">{item.date}</p>
                        </div>
                    </li>
                {/each}
            </ul>
        {/each}
    </div>
</div>

<script lang="ts">
    import { onMount, tick } from "svelte";
    import { scale } from "svelte/transition";
    import { dev } from "$app/environment";

    import Stamp, { type StampItem } from "@/modules/stamp";

    import {
        Tooltip,
        Dropdown,
        DropdownItem,
        Radio,
        Checkbox
    } from "flowbite-svelte";
    import {
        QuestionCircleOutline,
        RulerCombinedOutline,
        ChevronLeftOutline,
        ArrowUpOutline,
        ArrowDownOutline,
        FilterOutline,
        GithubSolid
    } from "flowbite-svelte-icons";

    import {
        dateParse,
        browserVersion,
        debounce
    } from "@pomerun/util";

    const stampImageUrlPrefix = dev ? "/images/" : "https://assets.stamp.pecasha.com/images/stamps/";

    const imgEls: HTMLImageElement[] = [];

    const stamp = new Stamp();
    let list = stamp.data;
    let columns: StampItem[][] = $state([]);

    let listEl: HTMLDivElement;

    let columnCount = $state(0);

    let sort = $state(0);
    let urlTarget = $state("_blank");

    let filterValueMap: number[] = Object.keys(stamp.dataByValue).map(Number).sort((a, b) => a - b);
    let filterValue: number[] = $state([]);
    let filterTypeMap: string[] = Object.keys(stamp.dataByType);
    let filterType: string[] = $state([]);
    let filterSizeMap: string[] = Object.keys(stamp.dataBySize);
    let filterSize: string[] = $state([]);

    const filterChange = (target: (number|string)[], event: Event, value: number|string) => {
        const { checked } = event.target as HTMLInputElement;
        if(checked) {
            target.push(value);
        } else {
            const idx = target.indexOf(value);
            target.splice(idx, 1);
        }
        filterUpdate();
    }

    const filterUpdate = async () => {
        for(let i=0; i<columns.length; i++) {
            columns[i] = [];
        }
        await tick();
        const _el = listEl.querySelector("li[inert]");
        if(_el) {
            const observer = new MutationObserver(mutations => {
                for(const mutation of mutations) {
                    if (!mutation.target.contains(_el)) {
                        observer.disconnect();
                        columns = [];
                        listUpdate();
                        setColumns();
                    }
                }
            });
            observer.observe(listEl, {
                childList: true,
                subtree: true
            });
        } else {
            columns = [];
            listUpdate();
            setColumns();
        }
    }

    const listUpdate = () => {
        list = stamp.data.filter(item => [
            filterValue.length ? filterValue.includes(item.value) : true,
            filterType.length ? filterType.includes(item.type) : true,
            filterSize.length ? filterSize.includes(item.size) : true
        ].every(Boolean)).sort((a, b) => {
            const dateA = dateParse("20" + a.date).getTime();
            const dateB = dateParse("20" + b.date).getTime();
            switch (sort) {
                case 0:
                    return dateB - dateA;
                case 1:
                    return dateA - dateB;
                case 2:
                    return b.value - a.value;
                case 3:
                    return a.value - b.value;
                default:
                    return dateB - dateA;
            }
        });
    }

    const setColumnInfo = () => {
        const style = getComputedStyle(listEl)
        columnCount = style.gridTemplateColumns.split(" ").filter(c => c.trim()).length || 1;
    }

    const setColumns = () => {
        const cols = Array.from({
            length: columnCount
        }, () => ({
            items: [] as StampItem[],
            height: 0
        }));

        for (const item of list) {
            let minIndex = 0;
            for (let i=1; i<cols.length; i++) {
                if (cols[i].height < cols[minIndex].height) {
                    minIndex = i;
                }
            }
            cols[minIndex].items.push(item);
            cols[minIndex].height += 240 / item.imgRatio + Math.ceil(item.title.length / 11) * 26 + (item.name ? Math.ceil(item.name.length / 15) * 20 + 6 : 0); // 宽度固定240px就可以，因为所有列的宽度都是相同的
        }

        columns = cols.map(col => col.items);
    }

    onMount(() => {
        setColumnInfo();
        setColumns();
        window.addEventListener("resize", debounce(() => {
            columns = [];
            tick().then(() => {
                setColumnInfo();
                setColumns();
            });
        }, 200));

        if(browserVersion().mobile) {
            urlTarget = "_self";
        }
        for(const img of imgEls) {
            if(img.complete) {
                img.classList.add("loaded");
            } else {
                img.addEventListener("load", () => {
                    img.classList.add("loaded");
                });
            }
        }
    });
</script>

<style lang="less">
    @import "../styles/control.module";

    :global(*) {
        border: none;
        outline: 0;
        zoom: 1;
        resize: none;
        list-style-type: none;
        -webkit-text-size-adjust: none;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, "-apple-system", sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-touch-callout: none;
        box-sizing: border-box;
        user-select: none;
        interpolate-size: allow-keywords;
    }
    :global(html),
    :global(body) {
        width: 100%;
        min-height: 100%;
        background-color: #f1f5f8;
    }
    :global(body) {
        min-width: 299px;
        overflow-x: hidden;
    }
    :global(::-webkit-scrollbar) {
        width: 10px;
        height: 10px;
        background-color: rgba(255,255,255,.8);
        backdrop-filter: blur(10px);
    }
    :global(::-webkit-scrollbar-thumb) {
        border-radius: 5px;
        background-color: rgba(0,0,0,.3);
    }
    :global(::selection) {
        background-color: #bbb;
        color: #fff;
    }
    :global(img) {
        display: block;
        user-select: none;
    }

    .page {
        position: relative;
        width: 100%;
    }

    header {
        .align(v-center);
        .align(h-space-between);
        z-index: 999;
        position: sticky;
        top: 0;
        width: 100%;
        height: 80px;
        padding: 15px;
        border-bottom: 1px solid rgba(0,0,0,.1);
        background-color: rgba(255,255,255,.8);
        backdrop-filter: blur(10px);
        .logo {
            .align(v-center);
            flex: 1;
            width: 0;
            height: 100%;
            user-select: none;
            > img {
                height: 100%;
            }
            > section {
                .align(h-space-between, flex, column);
                flex: 1;
                width: 0;
                height: 100%;
                padding: 2px 0;
                margin-left: 10px;
                margin-right: 20px;
                > h1 {
                    .align(v-center);
                    width: 100%;
                    height: 24px;
                    line-height: 1;
                    font-weight: bold;
                    font-size: 16px;
                    :global(> svg) {
                        display: none;
                    }
                }
                > h2 {
                    position: relative;
                    width: 100%;
                    min-height: 16px;
                    line-height: 16px;
                    column-gap: 4px;
                    font-size: 12px;
                    color: #999;
                    :global(> svg) {
                        display: inline-block;
                        vertical-align: text-bottom;
                    }
                }
                :global(> div),
                :global(> div + p) {
                    display: none;
                }
            }
        }
        .menu {
            height: 100%;
            .menu-button {
                .align(center);
                height: 100%;
                gap: 10px;
                > * {
                    .align(v-center, inline-flex);
                    height: 100%;
                    padding: 0 10px;
                    gap: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    color: #999;
                }
            }
        }
    }

    .scrollbar-border {
        position: fixed;
        width: 1px;
        height: calc(100vh - 80px);
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.1);
    }

    .list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
        padding: 20px;
        .column {
            display: flex;
            flex-direction: column;
            column-gap: 20px;
            width: 100%;
            > li {
                width: 100%;
                padding: 20px;
                overflow: hidden;
                margin-bottom: 20px;
                border-radius: 10px;
                background-color: #fff;
                border: 1px solid #e4e7ed;
                color: #555;
                transition: all .3s ease;
                &:hover,
                &:focus {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,.08);
                }
                > img {
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 15px;
                    border-radius: 5px;
                    background-color: #eee;
                    transition: none ease 1s;
                    transition-property: border-radius, filter, background-color;
                    &:global(.loaded) {
                        will-change: contents;
                        border-radius: 0;
                        filter: drop-shadow(0 0 2px rgba(0,0,0,.25));
                        background-color: transparent;
                        object-fit: contain;
                    }
                }
                .title {
                    width: 100%;
                    line-height: 26px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: default;
                }
                .name {
                    width: 100%;
                    min-height: 20px;
                    margin-top: 6px;
                    line-height: 20px;
                    cursor: default;
                    > p {
                        display: inline;
                        font-size: 12px;
                        color: #999;
                    }
                }
                .tag {
                    display: inline-flex;
                    padding: 0 5px;
                    height: 16px;
                    font-size: 12px;
                    justify-content: center;
                    align-items: center;
                    vertical-align: middle;
                    line-height: 1;
                    border-radius: 4px;
                    white-space: nowrap;
                    background-color: #f4f4f5;
                    border: 1px solid #e9e9eb;
                    color: #909399;
                    user-select: none;
                }
                .denomination {
                    .align(v-center);
                    .align(h-space-between);
                    width: 100%;
                    padding: 10px 0;
                    margin-top: 10px;
                    border-top: 1px solid #eee;
                    user-select: none;
                    > b {
                        font-size: 20px;
                        color: #f08282;
                        &::before {
                            content: "￥";
                        }
                    }
                    > p {
                        .align(v-center, inline-flex);
                        height: 100%;
                        column-gap: 2px;
                        font-size: 15px;
                        color: #999;
                    }
                }
                .type {
                    .align(bottom);
                    .align(h-space-between);
                    width: 100%;
                    height: 22px;
                    user-select: none;
                    .tag {
                        height: 22px;
                        padding: 0 6px;
                        border: 0;
                        color: #fff;
                        &.普通邮票 {
                            background-color: lighten(#409eff, 20%);
                        }
                        &.特种邮票 {
                            background-color: lighten(#67c23a, 20%);
                        }
                        &.纪念邮票 {
                            background-color: lighten(#e6a23c, 20%);
                        }
                        &.特别发行邮票 {
                            background-color: lighten(#c351a7, 20%);
                        }
                        &.贺卡专用邮票 {
                            background-color: lighten(#39bfb3, 20%);
                        }
                        &.个性化服务专用邮票 {
                            background-color: lighten(#d86f38, 20%);
                        }
                        &.贺年专用邮票 {
                            background-color: lighten(#f56c6c, 20%);
                        }
                    }
                    > p {
                        padding-bottom: 2px;
                        line-height: 1;
                        text-decoration: underline;
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 499px) {
        :global(::-webkit-scrollbar) {
            width: 6px;
            height: 6px;
            background-color: transparent;
            backdrop-filter: none;
        }
        header {
            height: 50px;
            padding: 12px 20px;
            .logo > section {
                margin-left: 5px;
                > h1 {
                    gap: 2px;
                    :global(> svg) {
                        display: inline-block;
                        vertical-align: text-bottom;
                    }
                }
                > h2 {
                    display: none;
                }
            }
            .menu {
                .menu-button {
                    gap: 10px;
                    > * {
                        padding-right: 0;
                        font-size: 12px;
                    }
                }
                :global(.w-5) {
                    width: 1rem;
                }
                :global(.h-5) {
                    height: 1rem;
                }
                :global(.w-6) {
                    width: 1rem;
                }
                :global(.h-6) {
                    height: 1rem;
                }
                :global(.text-base) {
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                }
                :global(.px-4) {
                    padding-left: 0.75rem;
                    padding-right: 0.75rem;
                }
                :global(.pe-4) {
                    -webkit-padding-end: 0.75rem;
                    padding-inline-end: 0.75rem;
                }
            }
        }
        .scrollbar-border {
            display: none;
        }
        .list {
            column-gap: 15px;
            padding: 15px;
            .column {
                column-gap: 15px;
                > li {
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>
