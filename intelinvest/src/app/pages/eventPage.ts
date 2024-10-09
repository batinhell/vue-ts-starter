import { Component, UI } from '@intelinvest/platform/src/app/ui';

@Component({
  // language=Vue
  template: `
    <v-container fluid class="selectable">
      <v-card class="mx-auto" color="primary" width="200px">
        <v-card-text class="white--text">
          <div class="d-flex">Название: {{ event.label }}</div>
          <div class="d-flex">Дата: {{ event.date }}</div>
          <div class="d-flex">Сумма: {{ event.totalAmount }}</div>
          <div class="d-flex">Количество: {{ event.quantity }}</div>
          <div class="d-flex">Период: {{ event.period }}</div>
        </v-card-text>
      </v-card>
    </v-container>
  `,
})
export class EventPage extends UI {
  private event: any = [];

  async created(): Promise<void> {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const response = await fetch('http://localhost:3004/events', params);
    const events = await response.json();

    this.event = events[this.$route.params.id];
  }
}
