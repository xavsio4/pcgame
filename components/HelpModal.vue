<template>
  <div class="mx-auto overflow-y-scroll">
    <div class="p-10 rounded-xl bg-white overflow-y-scroll h-60">
      <div class="font-bold text-3xl">Help</div>
      <p>
        Primares&#174; is a board game about primary and secondary colors. This is an
        online variant for solo players. The board game can be played up to four
        people and has more strategies involved.
      </p>
      <br />
      <p>
        The aim of the game is to place the color tiles adjacent to the others
        tiles according to the color relationship rules between color.
      </p>
      <p>
        You have 3 primary colors: Red, yellow and blue that can't be adjecent
        one to the other.
      </p>
      <br />
      <p>
        And you have 3 secondary colors: Purple, green and orange that
        represents the mix of primary colors.
      </p>
      <br />
      <p>
        You also have white tiles, represented by the dropdown in this on screen
        variant, and a black title wich is a wildcard. Any color can be adjacent
        to a black tile. But there are drawbacks in using black tiles.
      </p>
      <br />
      <h2>Color's rules</h2>
      <p>
        Primary colors can't be adjacent to one another. Red can be adjacent to
        an orange tile because orange is a mix of red and yellow.
      </p>
      <p>
        Red can also be adjacent to purple as purple is made of blue and red.
      </p>
      <p>To summarize, all secondary colors: orange, green and purple can always touch each other, 
        since they always contain a common color.  The three primary colors: red, yellow and blue can never touch each other. 
        Red can never touch green, yellow can never touch purple, blue can never touch orange.</p>
      <p>Here goes a table of combination:</p>
      <br/>
      <table class="table-auto border-solid">
        <thead><tr><th>With</th><th>you can combine to</th></tr></thead>
        <tbody><tr>
          <td><div class="red h-5 w-5 rounded-md"></div>
          <td class="flex flex-row"><div class="red h-5 w-5 rounded-md"></div><div class="orange h-5 w-5 rounded-md"></div><div class="purple h-5 w-5 rounded-md"></div><div class="black h-5 w-5 rounded-md"></div></td></td>
        </tr>
        <tr>
          <td><div class="yellow h-5 w-5 rounded-md"></div>
          <td class="flex flex-row"><div class="orange h-5 w-5 rounded-md"></div><div class="green h-5 w-5 rounded-md"></div><div class="yellow h-5 w-5 rounded-md"></div><div class="black h-5 w-5 rounded-md"></div></td></td>
        </tr>
        <tr>
          <td><div class="blue h-5 w-5 rounded-md"></div>
          <td class="flex flex-row"><div class="purple h-5 w-5 rounded-md"></div><div class="green h-5 w-5 rounded-md"></div><div class="blue h-5 w-5 rounded-md"></div><div class="black h-5 w-5 rounded-md"></div></td></td>
        </tr>
        <tr>
          <td><div class="purple h-5 w-5 rounded-md"></div>
          <td class="flex flex-row"><div class="green h-5 w-5 rounded-md"></div><div class="orange h-5 w-5 rounded-md"></div><div class="purple h-5 w-5 rounded-md"></div><div class="red h-5 w-5 rounded-md"></div><div class="blue h-5 w-5 rounded-md"></div><div class="black h-5 w-5 rounded-md"></div></td></td>
        </tr>
        <tr>
          <td><div class="orange h-5 w-5 rounded-md"></div>
          <td class="flex flex-row"><div class="purple h-5 w-5 rounded-md"></div><div class="green h-5 w-5 rounded-md"></div><div class="yellow h-5 w-5 rounded-md"></div><div class="red h-5 w-5 rounded-md"></div><div class="orange h-5 w-5 rounded-md"></div><div class="black h-5 w-5 rounded-md"></div></td></td>
        </tr>
        <tr>
          <td><div class="green h-5 w-5 rounded-md"></div>
          <td class="flex flex-row"><div class="purple h-5 w-5 rounded-md"></div><div class="orange h-5 w-5 rounded-md"></div><div class="yellow h-5 w-5 rounded-md"></div><div class="green h-5 w-5 rounded-md"></div><div class="blue h-5 w-5 rounded-md"></div><div class="black h-5 w-5 rounded-md"></div></td></td>
        </tr></tbody>
      </table>
      <br />
      <h2>Points</h2>
      <p>
        By each wrong move you will be penalized by one point less. Each right
        move gives you the point of the tile you placed. Here under is the list
        of points in the solo variant.
      </p>
      <table class="table border-collapse">
        <tr>
          <th>Color</th>
          <th>Points</th>
        </tr>
        <tr >
          <td >
            <div class="red h-5 w-5 rounded-md"></div>
          </td>
          <td >2 points</td>
        </tr>
        <tr>
          <td>
            <div class="yellow h-5 w-5 rounded-md"></div>
          </td>
          <td>2 points</td>

        </tr>
        <tr>
          <td>
            <div class="blue h-5 w-5 rounded-md"></div>
          </td>
          <td>2 points</td>
        </tr>
        <tr>
          <td>
            <div class="purple h-5 w-5 rounded-md"></div>
          </td>
          <td>1 points</td>
        </tr>
        <tr>
          <td>
            <div class="orange h-5 w-5 rounded-md"></div>
          </td>
          <td>1 points</td>
        </tr>
        <tr>
          <td>
            <div class="green h-5 w-5 rounded-md"></div>
          </td>
          <td>1 points</td>
        </tr>
        <tr>
          <td>
            <div class="black h-5 w-5 rounded-md"></div>
          </td>
          <td>0 points</td>
        </tr>
      </table>
      <br />
      <h2>Black & White tiles</h2>
      <p>
        You obtain a white tile when you've filled an horizontal or vertical
        line that has no black tile in it.
      </p>
      <p>
        White tiles can be used anytime if the random color can't be used. If
        you choose a color from the white tile dropdown it will replace the
        random color for the turn and you instantly loose a white tile.
      </p>
      <br />
      <p>
        The black title can be called anytime and is a non value tile. You can
        put any color adjacent to it. However, any line where a black tile is,
        will not be transformed into a white tile.
      </p>
      <br />
      <h2>Strategy</h2>
      <p>
        Try to build squares of 2,3,4,or 5 if you can. Besides the value of the
        tiles, any square of the same color will provide additional points. Here
        are the points by squares realized :
      </p>
      <br/>
      <table class="table">
        <tr>
          <th>Square of</th>
          <th>Points</th>
        </tr>
        <tr>
          <td>5</td>
          <td>300 points</td>
        </tr>
        <tr>
          <td>4</td>
          <td>180 points</td>
        </tr>
        <tr>
          <td>3</td>
          <td>75 points</td>
        </tr>
        <tr>
          <td>2</td>
          <td>15 points</td>
        </tr>
      </table>
      <br />
      <h2>Bonus Phase</h2>
      <p>
        When you've completed your board and you still have white tiles, you can
        use any color to try to build squares. However, black tiles can't be
        replaced and the color rules still apply. And the end of the Bonus phase
        you'll get your score that you can record in the Hall of Fame with a
        pseudo...only if you want to....
      </p>
      <br/>
      <h2>Game controls</h2>
              
      <table class="table">
        <tr>
          <td><button
                class="
                  p-2
                  flex
                  bg-blue-500
                  text-white
                  cursor-pointer
                  rounded-md
                  mr-2
                "
              >
                <InformationCircleIcon size="1.2x" class="flex" />
              </button></td>
        <td>opens the help window</td></tr>
        <tr>
          <td><button
                title="Restart Game"
                class="
                  p-2
                  bg-blue-500
                  text-white
                  rounded-md
                "
              >
                <RefreshIcon size="1.2x" class="flex" />
              </button></td>
        <td>Restart the game</td>
        </tr>
        <tr>
          <td><button
                class="text-black rounded-md border-solid border-black  "
                to="hof"
                >HoF</button
              ></td>
        <td>Go to hall of fame page</td>
        </tr>
        <tr><td><button
                class="
                  p-2
                  bg-blue-500
                  text-white
                  rounded-md
                "
                title="Toggle Sound"
              >
                <VolumeUpIcon
                  size="1.2x"
                  class="flex"
                />
                
              </button></td><td>Toggle sound</td></tr>
      </table>
      <br/>
      <h2>Credits</h2>
      <ul><li>Game created by ....... W. Vandervelde</li>
      <li><span class="italic">Primares&#174; and its gameplay are registered.</span> </li></ul>
      
      <br/>
      
    </div>
  </div>
</template>
<script>
import {
  TrashIcon,
  PauseIcon,
  SaveIcon,
  LogoutIcon,
  PlayIcon,
  VolumeUpIcon,
  VolumeOffIcon,
  RefreshIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from '@vue-hero-icons/outline'

export default {
  components:{
    TrashIcon,
    PauseIcon,
    SaveIcon,
    LogoutIcon,
    PlayIcon,
    VolumeUpIcon,
    VolumeOffIcon,
    RefreshIcon,
    InformationCircleIcon,
    ChevronDownIcon
  }
  
}
</script>
<style scoped>
td {
  @apply border p-2;
}

</style>
