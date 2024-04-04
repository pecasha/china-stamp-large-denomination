<main>
    <slot />
</main>

<svelte:head>
    {@html webManifestLink}
</svelte:head>

<script lang="ts">
    import "../app.pcss";
    import { pwaInfo } from "virtual:pwa-info";

    $: webManifestLink = pwaInfo?.webManifest.linkTag || "";
</script>
