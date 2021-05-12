<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
            :key="qweet.id"
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
                <q-btn
                  @click="toggleLiked(qweet)"
                  :color="qweet.liked ? 'accent' : 'grey'"
                  size="sm"
                  flat
                  round
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                />
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
import { defineComponent, ref, onMounted, onBeforeMount } from "vue";
// FNS dato formaterer automatisk tidspunktet for os når vi har kørt date.now()
import { formatDistance } from "date-fns";
//DB import
import { db } from "src/boot/firebase.js";
import firebase from 'firebase';
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: "PageHome",
  setup() {
    const newQweetContent = ref("");
    const qweets = ref([]);

    //Tilføjer det seneste "qweet i array"
    function addNewQweet() {
      let newQweet = {
        content: newQweetContent.value,
        date: Date.now(),
        liked: false,
      };
      //qweets.value.unshift(newQweet);
      // Add a new document with a generated id.
      db.collection("qweets")
        .add(newQweet)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      newQweetContent.value = "";
    }
    //Sletter seneste qweet som bliver trykket på.
    function deleteQweet(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }

    // laver en function hvor vi via compAPI laver værdien om direkte i funktionen, også kaldes funktionen ved den value.
    function filterTime(value) {
      //Omregner vores date.now()
      return formatDistance(value, new Date());
    }

    //Farver hjertet rød
    function toggleLiked(qweet) {
      db.collection("qweets")
        .doc(qweet.id)
        .update({
          liked: !qweet.liked,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }

    const router = useRouter()
    const route = useRoute()
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login")
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });

    //On snapshot sørger for at se efter changes hele tiden.
    onMounted(() => {
      db.collection("qweets")
        .orderBy("date")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let qweetChange = change.doc.data();
            qweetChange.id = change.doc.id;
            if (change.type === "added") {
              console.log("New qweet: ", qweetChange);
              qweets.value.unshift(qweetChange);
            }

            if (change.type === "modified") {
              console.log("Modified qweet: ", qweetChange);
              let index = qweets.value.findIndex(
                (qweet) => qweet.id === qweetChange.id
              );
              Object.assign(qweets.value[index], qweetChange);
            }

            if (change.type === "removed") {
              console.log("Removed qweet: ", qweetChange);

              let index = qweets.value.findIndex(
                (qweet) => qweet.id === qweetChange.id
              );
              qweets.value.splice(index, 1);
            }
          });
        });
    });

    return {
      newQweetContent,
      qweets,
      filterTime,
      addNewQweet,
      deleteQweet,
      toggleLiked,
      ref
    };
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