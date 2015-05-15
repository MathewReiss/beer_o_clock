#include <pebble.h>
	
void init(void){
	Window *my_window = window_create();
	window_stack_push(my_window, false);
}
	
int main(void){init(); app_event_loop();}