<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div id="content" class="content content-full-width">
          <!-- begin profile-content -->
          <div class="profile-content">
            <!-- begin tab-content -->
            <div class="tab-content p-0">
              <!-- begin #profile-friends tab -->
              <div class="tab-pane fade in active show" id="profile-friends">
                <h4 class="m-t-0 m-b-20">Friend List ({{ users.length }})</h4>
                <!-- begin row -->
                <div class="row row-space-2">
                  <!-- begin col-6 -->
                  <div v-for="item in users" :key="item.id" class="col-md-7 m-b-2">
                    <div class="p-10">
                      <div class="media media-xs overflow-visible">
                        <md-avatar>
                          <img :src="item.picture" alt="" class="media-object img-circle">
                        </md-avatar>
                        <div class="media-body valign-middle">
                          <b v-if="item.name" class="text-inverse">{{ item.name }}</b>
                          <b v-else class="text-inverse">{{ item.email }}</b>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!-- end col-6 -->

                </div>
                <!-- end row -->
              </div>
              <!-- end #profile-friends tab -->
            </div>
            <!-- end tab-content -->
          </div>
          <!-- end profile-content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {API_BASE_URL} from '/src/config.js';
import firebase from "../firebase";

export default {
  name: "ListFriends",
  data() {
    return {
      users: [],
      email: '',
      username: localStorage.getItem('username'),
      ref: firebase.database().ref('chatrooms/')
    }
  },
  methods: {
    listFriends() {
      axios.get(`${API_BASE_URL}private/listFriends`, {
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
        }
      }).then(resp => {
        console.log("list friends", resp.data, resp.status);
        if (resp.status === 200) {
          this.users = resp.data;
        }
      }).catch((err) => {
        if (err.response.status == 401) {
          this.$router.push('/login');
        }
      });
    },
    fetchRoom(id, friendName) {
      console.log(id);
      axios.get(`${API_BASE_URL}private/getRoomName?friendId=${id}`, {
        'headers': {
          'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
        }
      }).then(resp => {
        console.log(resp.data);
        this.ref.orderByChild('roomName').equalTo(resp.data).once('value', snapshot => {
          if (snapshot.exists()) {
            console.log('Room Exists');
            snapshot.forEach((doc) => {
              console.log(doc.key);
              this.$router.push({name: 'Chat',
                params: {
                  nickname: localStorage.getItem('username'),
                  roomid: doc.key,
                  roomname: resp.data,
                  friend: friendName
                }
              });
              return true;
            })
          } else {
            console.log("Does not Exist")
            let newData = this.ref.push()
            newData.set({
              roomName: resp.data
            })
          }
        })
      }).catch(err => console.log(err))
    }
  },
  mounted() {
    if (!this.username) {
      this.$router.push('/login')
    } else {
      this.listFriends();
    }
  }
}
</script>

<style scoped>


.profile-content {
  padding: 25px;
  border-radius: 4px
}

.profile-content:after,
.profile-content:before {
  content: '';
  display: table;
  clear: both
}

.profile-content .tab-content,
.profile-content .tab-pane {
  background: 0 0
}

.profile-image img {
  display: block;
  max-width: 100%
}


.profile-highlight h4 {
  margin: 0 0 7px;
  font-size: 12px;
  font-weight: 700
}

.table.table-profile>thead>tr>th {
  border-bottom: none!important
}

.table.table-profile>thead>tr>th h4 {
  font-size: 20px;
  margin-top: 0
}

.table.table-profile>thead>tr>th h4 small {
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px
}

.table.table-profile>tbody>tr>td,
.table.table-profile>thead>tr>th {
  border: none;
  padding-top: 7px;
  padding-bottom: 7px;
  color: #242a30;
  background: 0 0
}

.table.table-profile>tbody>tr>td.field {
  width: 20%;
  text-align: right;
  font-weight: 600;
  color: #2d353c
}

.table.table-profile>tbody>tr.highlight>td {
  border-top: 1px solid #b9c3ca;
  border-bottom: 1px solid #b9c3ca
}

.table.table-profile>tbody>tr.divider>td {
  padding: 0!important;
  height: 10px
}

.flat-black .sidebar .nav>li>a {
  color: #b2b2b2
}

.flat-black .sidebar.sidebar-grid .nav>li>a {
  border-bottom: 1px solid #474747;
  border-top: 1px solid #474747
}

.flat-black .sidebar .active .sub-menu>li.active>a,
.flat-black .sidebar .nav>li.active>a,
.flat-black .sidebar .nav>li>a:focus,
.flat-black .sidebar .nav>li>a:hover,
.flat-black .sidebar .sub-menu>li>a:focus,
.flat-black .sidebar .sub-menu>li>a:hover,
.sidebar .nav>li.nav-profile>a {
  color: #fff
}

.flat-black .sidebar .sub-menu>li>a,
.flat-black .sidebar .sub-menu>li>a:before {
  color: #999
}

.flat-black .page-with-light-sidebar .sidebar .active .sub-menu>li.active>a,
.flat-black .page-with-light-sidebar .sidebar .active .sub-menu>li.active>a:focus,
.flat-black .page-with-light-sidebar .sidebar .active .sub-menu>li.active>a:hover,
.flat-black .page-with-light-sidebar .sidebar .nav>li.active>a,
.flat-black .page-with-light-sidebar .sidebar .nav>li.active>a:focus,
.flat-black .page-with-light-sidebar .sidebar .nav>li.active>a:hover {
  color: #000
}

.flat-black .page-sidebar-minified .sidebar .nav>li.has-sub:focus>a,
.flat-black .page-sidebar-minified .sidebar .nav>li.has-sub:hover>a {
  background: #323232
}

.flat-black .page-sidebar-minified .sidebar .nav li.has-sub>.sub-menu,
.flat-black .sidebar .nav>li.active>a,
.flat-black .sidebar .nav>li.active>a:focus,
.flat-black .sidebar .nav>li.active>a:hover,
.flat-black .sidebar .nav>li.nav-profile,
.flat-black .sidebar .sub-menu>li.has-sub>a:before,
.flat-black .sidebar .sub-menu>li:before,
.flat-black .sidebar .sub-menu>li>a:after {
  background: #2A2A2A
}

.flat-black .page-sidebar-minified .sidebar .sub-menu>li:before,
.flat-black .page-sidebar-minified .sidebar .sub-menu>li>a:after {
  background: #3e3e3e
}

.flat-black .sidebar .nav>li.nav-profile .cover.with-shadow:before {
  background: rgba(42, 42, 42, .75)
}

.bg-white {
  background-color: #fff!important;
}
.p-10 {
  padding: 10px!important;
}
.media.media-xs .media-object {
  width: 32px;
}
.m-b-2 {
  margin-bottom: 2px!important;
}
.media>.media-left, .media>.pull-left {
  padding-right: 15px;
}
.media-body, .media-left, .media-right {
  display: table-cell;
  vertical-align: top;
}

</style>
