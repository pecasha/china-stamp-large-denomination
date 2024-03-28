<div class="page">
    <ul class="list">
        {#each list as item}
            <li>
                <img src="https://assets.stamp.pecasha.com/images/stamps/{item.img}.png"
                     alt={item.name||item.title}>
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

    import { browserImageCacheLoaderQueue } from "@pecasha/util";

    import Stamp, { type StampItem } from "@/modules/stamp";

    const stamp = new Stamp();

    let list: StampItem[] = stamp.data;

    onMount(async () => {
        await browserImageCacheLoaderQueue(list.map(item => `https://assets.stamp.pecasha.com/images/stamps/${item.img}.png`));
        document.querySelector(".page-loading")!.remove();
        document.body.classList.remove("loading");
    });
</script>

<style lang="less">
    @import "../styles/control.module";

    :global(*) {
        margin: 0;
        padding: 0;
        border: none;
        outline: 0;
        list-style-type: none;
        -webkit-text-size-adjust: none;
        zoom: 1;
        resize: none;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,"-apple-system",sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
    }
    :global(::-webkit-scrollbar-thumb) {
        border-radius: 8px;
        background-color: rgba(0, 0, 0, .3);
    }
    :global(img) {
        display: block;
    }

    .page {
        position: relative;
        width: 100%;
        padding: 20px;
    }

    .list {
        width: 100%;
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
                margin-bottom: 20px;
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
        .page {
            padding: 10px;
        }
        .list {
            column-count: 1;
            column-gap: 10px;
            > li {
                margin-bottom: 10px;
            }
        }
    }
    @media screen and (min-width: 300px) {
        .page {
            padding: 10px;
        }
        .list {
            column-count: 2;
            column-gap: 10px;
            > li {
                margin-bottom: 10px;
            }
        }
    }
    @media screen and (min-width: 600px) {
        .page {
            padding: 10px;
        }
        .list {
            column-count: 3;
            column-gap: 10px;
            > li {
                margin-bottom: 10px;
            }
        }
    }
    @media screen and (min-width: 800px) {
        .page {
            padding: 15px;
        }
        .list {
            column-count: 4;
            column-gap: 15px;
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
