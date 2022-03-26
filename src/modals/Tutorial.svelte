<script>
  import Modal from "../components/Modal.svelte";
  import { showTutorial } from "../store";
</script>

<Modal isVisible={$showTutorial} onClose={() => showTutorial.set(false)}>
  <h1>Wordplete</h1>
</Modal>
