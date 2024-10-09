import { Component, UI } from '@intelinvest/platform/src/app/ui';
import { RouterConfiguration } from '../router/routerConfiguration';

@Component({
  // language=Vue
  template: `
    <v-container fluid class="selectable">
      <div class="table-wrapper">
        <v-data-table
          v-model="selected"
          item-key="id"
          show-select
          :headers="headers"
          :items="events"
          :items-per-page="-1"
          :item-class="getItemClass"
          class="elevation-1"
          @click:row="onRowClick"
        >
          <template v-slot:top>
            <v-btn class="pa-3 mb-2" @click="isGroupedEventsShown = true">Показать выбранные</v-btn>

            <div v-if="isGroupedEventsShown" class="d-inline-flex">
              <span class="ml-5">∑:</span>

              <div v-for="event in groupedEvents">
                <span class="ml-5">{{ event.type }} {{ event.totalAmount }}</span>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-container>
  `,
})
export class EventsPage extends UI {
  private events: any = [];
  private selected: any = [];
  private isGroupedEventsShown: boolean = false;
  private router = RouterConfiguration.getRouter();

  private headers: any = [
    { text: 'Дата', value: 'date' },
    { text: 'Сумма', value: 'totalAmount' },
    { text: 'Количество', value: 'quantity' },
    { text: 'Название', value: 'label' },
    { text: 'Комментарий', value: 'comment' },
    { text: 'Период', value: 'period' },
  ];

  get groupedEvents(): any[] {
    const grouped: { [key: string]: number } = {};

    this.selected.forEach((e) => {
      if (!grouped[e.type]) {
        grouped[e.type] = 0;
      }
      grouped[e.type] += e.cleanAmount;
    });

    return Object.keys(grouped).map((type) => ({
      type,
      totalAmount: grouped[type],
    }));
  }

  async created(): Promise<void> {
    const params = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const response = await fetch('http://localhost:3004/events', params);
    this.events = await response.json();

    this.events.map((e: any, index: number) => {
      return Object.assign(e, { id: index, cleanAmount: Number(e.cleanAmount.split(' ')[1]) });
    });
  }

  onRowClick(evt: any) {
    this.router.push({ name: 'event', params: { id: evt.id } });
  }

  getItemClass() {
    return 'clickable-row';
  }
}
