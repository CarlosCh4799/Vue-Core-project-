import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //fechaG: '',
        validacion: 0,
        disponibilidad: '',
        idTr: '',
    },
    mutations:{
        /*updtFecha(state){
            state.fechaG ;
        },*/
        updtId(state){
            state.idTr ;
        },
        updtValid(state){
            state.validacion ;
        },
        updtDispo(state){
            state.disponibilidad ;
        }
    },
    actions:{
        /*updtFechaAction(context){
            context.commit('updtFecha');
        },*/
        updtIdAction(context){
            context.commit('updtId');
        },
        updtValidAction(context){
            context.commit('updtValid');
        },
        updtDispoAction(context){
            context.commit('updtDispo');
        }
    },
    getters:{
        /*getFechaG(state){
            return state.fechaG;
        },*/
        getId(state){
            return state.idTr;
        },
        getValidacion(state){
            return state.validacion;
        },
        getDisponibilidad(state){
            return state.disponibilidad;
        }
    }
})