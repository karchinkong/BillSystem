<template>
  <div>
      <template v-for="(item, index) in menuList">

          <Dropdown v-if="item.children.length !== 1" placement="right-start" @on-click="changeMenu">
              <a style="width: 70px;margin-left: -5px;padding:10px 0;" class="sideBarMenuShrink-item">
                  <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
              </a>
              <DropdownMenu slot="list" style="width: 200px;">
                  <DropdownItem v-for="(child, idx) in item.children" :key="idx" :name="child.name">
                      <Icon :type="child.icon"></Icon>
                      <span style="padding-left:10px;">{{child.title}}</span>
                  </DropdownItem>
              </DropdownMenu>
          </Dropdown>

          <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
              <a @click="changeMenu(item.children[0].name)" class="sideBarMenuShrink-item">
                  <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
              </a>
              <DropdownMenu style="width: 200px;" slot="list">
                  <DropdownItem :name="item.children[0].name" :key="'d' + index"><Icon :type="item.icon"></Icon><span style="padding-left:10px;">{{item.children[0].title}}</span></DropdownItem>
              </DropdownMenu>
          </Dropdown>

      </template>
  </div>
</template>

<script>

    export default {
        name: 'sidebarMenuShrink',
        props: {
            menuList: {
                type: Array
            },
            iconColor: {
                type: String,
                default: 'white'
            }
        },
        methods: {
            changeMenu(name) {
                this.$emit('on-change', name);
            }
        }
    }

</script>
