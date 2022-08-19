<template>
  <section>
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import {
  ALTERA_PROJETO,
  ADICIONA_PROJETO,
  NOTIFICAR,
} from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Formulario",

  props: {
    id: {
      type: String,
    },
  },

  data() {
    return {
      nomeDoProjeto: "",
    };
  },

  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },

  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }

      this.nomeDoProjeto = "";

      // const projeto = this.projetos.find((p) => p.id == this.idProjeto);
      // if (!projeto) {
      //   this.store.commit(NOTIFICAR, {
      //     titulo: 'Ops!',
      //     texto: "Selecione um projeto antes de finalizar a tarefa!",
      //     tipo: TipoNotificacao.ERRO,
      //   });
      //   return;
      // }

      this.store.commit(NOTIFICAR, {
        titulo: "Novo projeto foi salvo",
        texto: "Prontinho ;) seu projeto já está disponível",
        tipo: TipoNotificacao.SUCESSO,
      });
      this.$router.push("/projetos");
    },
  },

  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>


