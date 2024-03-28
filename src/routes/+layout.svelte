<slot></slot>

<svelte:head>
    {@html webManifestLink}
</svelte:head>

<script lang="ts">
    import { pwaInfo } from "virtual:pwa-info";

    $: webManifestLink = pwaInfo?.webManifest.linkTag || "";
</script>
