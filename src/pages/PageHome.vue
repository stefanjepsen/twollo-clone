<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            class="new-twoot"
            autogrow
            bottom-slots
            v-model="newQweetContent"
            label="Whats twooting yo?"
            counter
            maxlength="280"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img
                  src="https://i.guim.co.uk/img/media/02088fb2247b13df646907d47f552dc69a236bc7/0_748_3235_1940/master/3235.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=172ccbaa7535c9e16d0455138d20a07c"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            class="q-mb-lg"
            :disable="!newQweetContent"
            unelevated
            rounded
            no-caps
            color="primary"
            label="Twoot"
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated bounceOutDown slow"
        >
          <q-item
            v-for="qweet in qweets"
            :key="qweet.date"
            class="qweetStyle q-py-md"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img
                  src="https://i.guim.co.uk/img/media/02088fb2247b13df646907d47f552dc69a236bc7/0_748_3235_1940/master/3235.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=172ccbaa7535c9e16d0455138d20a07c"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong Stefan Dillerman />
                <span class="text-grey-7"
                  >@StefanNignoggeer <br class="lt-md" />
                  &bull; {{ filterTime(qweet.date) }}
                </span>
              </q-item-label>
              <q-item-label class="twoot-content text-body1">
                {{ qweet.content }}
              </q-item-label>

              <div class="twoot-icons row justify-between q-mt-sm">
                <q-btn
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                  flat
                  round
                />
                <q-btn color="grey" icon="far fa-heart" size="sm" flat round />
                <q-btn
                  @click="deleteQweet(qweet)"
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  flat
                  round
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
// FNS dato formaterer automatisk tidspunktet for os når vi har kørt date.now()
import { formatDistance } from "date-fns";
//DB import
import { db } from "src/boot/firebase.js";

export default defineComponent({
  name: "PageHome",
  setup() {
    const newQweetContent = ref("");
    const qweets = ref([
      /*  {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit qui exercitationem nisi, voluptates amet esse accusantium! Eaque debitis iure quidem nobis praesentium labore ratione, adipisci placeat pariatur doloribus assumenda.",
        date: 1620720167152,
      },
      {
        content:
          "Lorem2 ipsum dolor sit amet consectetur adipisicing elit. Sequi fugit qui exercitationem nisi, voluptates amet esse accusantium! Eaque debitis iure quidem nobis praesentium labore ratione, adipisci placeat pariatur doloribus assumenda.",
        date: 1620720167152,
      }, */
    ]);

    //Tilføjer det seneste "qweet i array"
    function addNewQweet() {
      let newQweet = {
        content: newQweetContent.value,
        date: Date.now(),
      };
      qweets.value.unshift(newQweet);
      newQweetContent.value = "";
    }

    function deleteQweet(qweet) {
      console.log("delete qweet:", qweet);
      let dateToDelete = qweet.date;
      let index = qweets.value.findIndex(
        (qweet) => qweet.date === dateToDelete
      );
      console.log("index:", index);
      qweets.value.splice(index, 1);
    }

    // laver en function hvor vi via compAPI laver værdien om direkte i funktionen, også kaldes funktionen ved den value.
    function filterTime(value) {
      //Omregner vores date.now()
      return formatDistance(value, new Date());
    }

    onMounted(() => {
      db.collection('qweets').onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              console.log('New qweet: ', change.doc.data())
            }
            if (change.type === 'modified') {
              console.log('Modified qweet: ', change.doc.data())
            }
            if (change.type === 'removed') {
              console.log('Removed city: ', change.doc.data())
            }
          })
        })
    })

    return { newQweetContent, qweets, filterTime, addNewQweet, deleteQweet };
  },
});
</script>

<style lang="sass">
.new-twoot
  textarea
    font-size: 19px
    line-height: 1.5 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.twoot-content
  white-space: pre-line

.twoot-icons
  margin-left: -5px

.qweetStyle:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>