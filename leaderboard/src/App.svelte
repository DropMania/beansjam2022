<script>
    import { getHighScores } from './firebase'
    import { onMount } from 'svelte'

    let highScores = []
    onMount(async () => {
        highScores = await getHighScores()
    })
</script>

<main class="container">
    <h1>Coffee Rush Leaderboard</h1>
    <table class="table table-hover mt-5">
        <thead>
            <tr class="table-primary">
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {#each highScores as { name, highscore }, i}
                <tr>
                    <td>{i + 1}</td>
                    <td>{name}</td>
                    <td>{highscore}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>
