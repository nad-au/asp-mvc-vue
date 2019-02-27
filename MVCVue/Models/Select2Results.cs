namespace MVCVue.Models
{
    public class Select2Item
    {
        public long Id { get; set; }
        public string Text { get; set; }
    }

    public class PaginationOptions
    {
        public bool More { get; set; }
    }

    public class Select2Results
    {
        public Select2Item[] Results { get; set; }
        //public PaginationOptions Pagination { get; set; } = new PaginationOptions();
    }
}
