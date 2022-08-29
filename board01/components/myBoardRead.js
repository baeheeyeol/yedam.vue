export default {
  template: `<div>
                    <table id="list">
                      <tr>
                        <td style="width:50px">글제목</td>
                        <td>{{data.title}}</td>
                      </tr>
                      <tr style="height:300px;">
                        <td colspan="2">{{data.content}}</td>
                      </tr>
                     <router-link tag ="button" style="float:right;"
                              :to="{name : 'boardList'}">목록</router-link>
                    </table>
                  </div>`,
  props: ['data']
}