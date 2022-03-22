$(document).ready(function () {
   var callData = new CallData()
   var chosenList = new ChosenList()

   function getElemTabPill(item, activeClass) {
      return `
         <li class="nav-item">
            <a
            class="nav-link ${activeClass} btn-default"
            data-toggle="pill"
            href="#${item.tabName}"
            >${item.showName}</a
            >
      </li>
      `
   }

   function getTypeArr(tabType, dataArr) {
      var tempArr = []
      dataArr.forEach(item => {
         if (item.type === tabType) {
            tempArr.push(item)
         }
      })
      return tempArr
   }

   function getElemItem(tempArr) {
      var elemItem = ''

      tempArr.forEach(item => {
         elemItem += `
         <div class="col-md-3">
            <div class="card text-center">
               <img
                  src="${item.imgSrc_jpg}"
               />
               <h4><b>${item.name}</b></h4>
               <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}"  data-imgsrcpng="${item.imgSrc_png}" class="changeStyle">Thử đồ</button>
            </div>
         </div>
         `
      })

      return elemItem
   }

   function renderTabPane(tabName, arrTabPanes) {
      var tempArr = []
      var elemItem = ''

      switch (tabName) {
         case 'tabTopClothes':
            tempArr = getTypeArr('topclothes', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break
         case 'tabBotClothes':
            tempArr = getTypeArr('botclothes', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break
         case 'tabShoes':
            tempArr = getTypeArr('shoes', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break
         case 'tabHandBags':
            tempArr = getTypeArr('handbags', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break
         case 'tabNecklaces':
            tempArr = getTypeArr('necklaces', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break
         case 'tabHairStyle':
            tempArr = getTypeArr('hairstyle', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break
         case 'tabBackground':
            tempArr = getTypeArr('background', arrTabPanes)
            elemItem = getElemItem(tempArr)
            break


         default:
            break
      }
      return elemItem
   }

   function renderHTML() {
      callData
         .getListData()
         .done(function (res) {
            // console.log(res.navPills)

            var contentNavPills = ''
            var contentTabPanes = ''
            res.navPills.forEach((item, index) => {

               var activeClass = item.tabName === 'tabTopClothes' ? 'active' : ''
               var fadeClass = item.tabName !== 'tabTopClothes' ? 'fade' : ''

               contentNavPills += getElemTabPill(item, activeClass)
               contentTabPanes += `
                  <div class="tab-pane container ${fadeClass} ${activeClass}" id="${item.tabName}">
                     <div class="row">
                        ${renderTabPane(item.tabName, res.tabPanes)}
                     </div>
                  </div>
               `
            });

            $('.nav-pills').html(contentNavPills)
            $('.tab-content').html(contentTabPanes)
         })
         .fail(function (err) {
            console.log(err)
         })
   }

   renderHTML()

   function findIndex(type) {
      var index = -1

      if (chosenList.arr && chosenList.arr.length > 0) {
         chosenList.arr.forEach((item, i) => {
            if (item.type === type) {
               index = i
            }
         })
      }
      return index
   }

   // getElemItem is invoked after the whole HTML is render, so normal call won't have any effect
   $("body").delegate(".changeStyle", "click", function () {
      var id = $(this).data('id')
      var type = $(this).data('type')
      var name = $(this).data('name')
      var desc = $(this).data('desc')
      var imgsrc_jpg = $(this).data('imgsrcjpg')
      var imgsrc_png = $(this).data('imgsrcpng')

      var choseItem = new ChoseItem(id, type, name, desc, imgsrc_jpg, imgsrc_png)

      var index = findIndex(choseItem.type)
      if (index !== -1) {
         // UPDATE
         chosenList.arr[index] = choseItem
      } else {
         // ADD
         chosenList.addItem(choseItem)
      }

      renderContain(chosenList.arr)
   })

   function renderContain(choseItems) {
      console.log(choseItems)
      if (choseItems && choseItems.length > 0) {
         choseItems.forEach(item => {
            switch (item.type) {
               case "topclothes":
                  renderBikiniTop(item.imgsrc_png)
                  break;
               case "botclothes":
                  renderBikiniBot(item.imgsrc_png)
                  break;
               case "shoes":
                  renderShoes(item.imgsrc_png)
                  break;
               case "handbags":
                  renderHandBags(item.imgsrc_png)
                  break;
               case "necklaces":
                  renderNecklaces(item.imgsrc_png)
                  break;
               case "hairstyle":
                  renderHairStyles(item.imgsrc_png)
                  break;
               case "background":
                  renderBackground(item.imgsrc_png)
                  break;
               default:
                  break;
            }
         })
      }
   }

   function renderBikiniTop(img) {
      $('.bikinitop').css({
         width: "500px",
         height: "500px",
         background: `url(${img})`,
         position: "absolute",
         top: "-9%",
         left: "-5%",
         zIndex: "3",
         transform: "scale(0.5)"
      })
   }

   function renderBikiniBot(img) {
      $('.bikinibottom').css({
         width: "500px",
         height: "1000px",
         background: `url(${img})`,
         position: "absolute",
         top: "-30%",
         left: "-5%",
         zIndex: "2",
         transform: "scale(0.5)"
      })
   }

   function renderShoes(img) {
      $('.feet').css({
         width: "500px",
         height: "1000px",
         background: `url(${img})`,
         position: "absolute",
         bottom: "-37%",
         right: "-3.5%",
         transform: "scale(0.5)",
         zIndex: "1"
      })
   }

   function renderHandBags(img) {
      $('.handbag').css({
         width: "500px",
         height: "1000px",
         background: `url(${img})`,
         position: "absolute",
         bottom: "-40%",
         right: "-3.5%",
         transform: "scale(0.5)",
         zIndex: "4"
      })
   }

   function renderNecklaces(img) {
      $('.necklace').css({
         width: "500px",
         height: "1000px",
         background: `url(${img})`,
         position: "absolute",
         bottom: "-40%",
         right: "-3.5%",
         transform: "scale(0.5)",
         zIndex: "4"
      })
   }

   function renderHairStyles(img) {
      $('.hairstyle').css({
         width: "1000px",
         height: "1000px",
         background: `url(${img})`,
         position: "absolute",
         top: "-75%",
         right: "-57%",
         transform: "scale(0.15)",
         zIndex: "4"
      })
   }

   function renderBackground(img) {
      $('.background').css({
         backgroundImage: `url(${img})`
         // backgroundImage: "../assets/images/background/background3.jpg"
      })
   }
})