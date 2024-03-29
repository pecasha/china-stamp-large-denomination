<div class="page">
    <header>
        <div class="logo">
            <img src="/favicon.png"
                 alt="中国大面值邮票图鉴">
            <section>
                <h1>中国大面值邮票图鉴</h1>
                <p>只收录有荧光编码并且面值大于等于 2元 的邮票，不包含小型张 <QuestionCircleOutline class="cursor-pointer" size="sm"/><Tooltip type="auto" placement="bottom">从 2002年9月7日 发行的「雁荡山」特种邮票之后，所有的邮票都使用了荧光喷码</Tooltip></p>
            </section>
        </div>
    </header>
    <hr class="scrollbar-border">
    <ul class="list">
        {#each list as item, index}
            <li>
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
            </li>
        {/each}
    </ul>
</div>

<script lang="ts">
    import { onMount } from "svelte";

    import Stamp, { type StampItem } from "@/modules/stamp";
    import { PUBLIC_STAMP_IMAGE_URL_PREFIX } from "$env/static/public";

    import { Tooltip } from "flowbite-svelte";

    import { QuestionCircleOutline } from "flowbite-svelte-icons";

    const stamp = new Stamp();

    let list: StampItem[] = stamp.data;
    const stampImageUrlPrefix = PUBLIC_STAMP_IMAGE_URL_PREFIX ?? "https://assets.stamp.pecasha.com/images/stamps/";

    const imgEls: HTMLImageElement[] = [];

    onMount(() => {
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
        -webkit-text-size-adjust: none;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, "-apple-system", sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-touch-callout: none;
    }
    :global(html),
    :global(body) {
        width: 100%;
        min-height: 100%;
        background-color: #f2f2f2;
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
    :global(img) {
        display: block;
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
                }
                > p {
                    .align(v-center);
                    position: relative;
                    will-change: contents;
                    width: 100%;
                    height: 18px;
                    line-height: 1;
                    column-gap: 4px;
                    font-size: 12px;
                    color: #999;
                }
                :global(> div),
                :global(> div + p) {
                    display: none;
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
        padding: 20px;
        column-count: 6;
        column-gap: 20px;
        > li {
            width: 100%;
            padding: 20px;
            overflow: hidden;
            margin-bottom: 20px;
            border-radius: 10px;
            background-color: #fff;
            border: 1px solid #e4e7ed;
            color: #303133;
            transition: ease .3s;
            &:hover,
            &:focus {
                box-shadow: 0 0 12px rgba(0,0,0,.12);
            }
            > img {
                width: 100%;
                overflow: hidden;
                margin-bottom: 20px;
                border-radius: 5px;
                background-color: #eee;
                transition: ease 1s;
                &:global(.loaded) {
                    will-change: contents;
                    border-radius: 0;
                    filter: drop-shadow(0 0 2px rgba(0,0,0,.25));
                    background-color: transparent;
                }
            }
            .title {
                width: 100%;
                line-height: 26px;
                font-size: 18px;
                font-weight: bold;
            }
            .name {
                width: 100%;
                min-height: 20px;
                margin-top: 6px;
                > p {
                    display: inline;
                    min-height: 20px;
                    line-height: 20px;
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
            }
        }
    }

    @media screen and (max-width: 299px) {
        .list {
            column-count: 1;
            column-gap: 10px;
            padding: 10px;
            > li {
                margin-bottom: 10px;
            }
        }
    }
    @media screen and (min-width: 300px) {
        .list {
            column-count: 2;
            column-gap: 10px;
            padding: 10px;
            > li {
                margin-bottom: 10px;
            }
        }
    }
    @media screen and (min-width: 600px) {
        .list {
            column-count: 3;
            column-gap: 10px;
            padding: 10px;
            > li {
                margin-bottom: 10px;
            }
        }
    }
    @media screen and (min-width: 800px) {
        .list {
            column-count: 4;
            column-gap: 15px;
            padding: 15px;
            > li {
                margin-bottom: 15px;
            }
        }
    }
    @media screen and (min-width: 1000px) {
        .list {
            column-count: 5;
        }
    }
    @media screen and (min-width: 1200px) {
        .list {
            column-count: 6;
        }
    }
    @media screen and (min-width: 1600px) {
        .list {
            column-count: 7;
        }
    }
    @media screen and (min-width: 1800px) {
        .list {
            column-count: 8;
        }
    }
    @media screen and (min-width: 2000px) {
        .list {
            column-count: 9;
        }
    }
</style>
