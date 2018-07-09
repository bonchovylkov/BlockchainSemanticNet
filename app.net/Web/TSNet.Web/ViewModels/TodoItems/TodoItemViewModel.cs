namespace TSNet.Web.ViewModels.TodoItems
{
    using TSNet.Common.Mapping;
    using TSNet.Data.Models;

    public class TodoItemViewModel : IMapFrom<TodoItem>
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public bool IsDone { get; set; }
    }
}
