using System;
using backend.DTO;

namespace backend.Models
{
	public class CreateUpdateProductId
	{
        public long Id { get; set; }
        public CreateUpdateProductDTO CUPdto { get; set; }
    }
}

