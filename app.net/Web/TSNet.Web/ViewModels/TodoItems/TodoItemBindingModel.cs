namespace TSNet.Web.ViewModels.TodoItems
{
    using System.ComponentModel.DataAnnotations;

    using TSNet.Common.Mapping;
    using TSNet.Data.Models;

    public class TodoItemBindingModel : IMapTo<TodoItem>
    {
        [Required]
        public string Title { get; set; }
    }
}
