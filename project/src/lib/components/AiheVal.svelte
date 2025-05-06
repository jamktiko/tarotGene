<script lang="ts">
  
let aihe=[{nimi:"rakkaus"},
  {nimi:"tulevaisuus"},
  {nimi:"koulu"}
]
let valittuAihe=$state(0)

</script>

<select bind:value={valittuAihe}>
  <option value={0}>Rakkaus</option>
  <option value={1}>Tulevaisuus</option>
  <option value={2}>Koulu</option>
</select>