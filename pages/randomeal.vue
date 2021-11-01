<template>
  <div>
    <h1 class="text-3xl text-center extrabold bg-pink-100 p-2">RandoMeal</h1>
    <div
      id="days"
      class="flex flex-row justyfy-between p-4 bg-pink-200 mx-auto"
    >
      <div class="flex-1">
        <label>Lundi</label>
        <input v-model="check[0][0]" type="checkbox" name="lun" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[0][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[0][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[0][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[0][1] === !check[0][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
      <div class="flex-1">
        <label>Mardi</label>
        <input v-model="check[1][0]" type="checkbox" name="mar" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[1][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[1][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[1][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[1][1] === !check[1][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
      <div class="flex-1">
        <label>Mercredi</label>
        <input v-model="check[2][0]" type="checkbox" name="mer" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[2][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[2][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[2][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[2][1] === !check[2][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
      <div class="flex-1">
        <label>Jeudi</label>
        <input v-model="check[3][0]" type="checkbox" name="jeu" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[3][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[3][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[3][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[3][1] === !check[3][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
      <div class="flex-1">
        <label>Vendredi</label>
        <input v-model="check[4][0]" type="checkbox" name="ven" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[4][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[4][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[4][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[4][1] === !check[4][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
      <div class="flex-1">
        <label>Samedi</label>
        <input v-model="check[5][0]" type="checkbox" name="sam" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[5][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[5][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[5][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[5][1] === !check[5][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
      <div class="flex-1">
        <label>Dimanche</label>
        <input v-model="check[6][0]" type="checkbox" name="dim" />
        <div class="flex flex-row">
          1&nbsp;
          <div
            class="
              relative
              rounded-full
              w-12
              h-6
              transition
              duration-200
              ease-linear
            "
            :class="[check[6][1] ? 'bg-green-400' : 'bg-gray-400']"
          >
            <label
              for="toggle"
              class="
                absolute
                left-0
                bg-white
                border-2
                mb-2
                w-6
                h-6
                rounded-full
                transition
                transform
                duration-100
                ease-linear
                cursor-pointer
              "
              :class="[
                check[6][1]
                  ? 'translate-x-full border-green-400'
                  : 'translate-x-0 border-gray-400',
              ]"
            ></label>
            <input
              type="checkbox"
              v-model="check[6][1]"
              class="
                appearance-none
                w-full
                h-full
                active:outline-none
                focus:outline-none
              "
              @click="check[6][1] === !check[6][1]"
            />
          </div>
          &nbsp;2
        </div>
      </div>
    </div>
    <div id="mealsday" class=""></div>
    <!-- Days -->
    <ul class="p-4">
      <li v-for="(item, index) in check" class="flex flex-row">
        <span class="font-bold">{{ days[index] }}</span
        >&nbsp;
        <div v-if="item[0]"></div>
        <div v-else>-----</div>
      </li>
    </ul>
    {{ check }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      days: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
      ],
      check: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
    }
  },
  methods: {
    async getData() {},
  },
}
</script>
