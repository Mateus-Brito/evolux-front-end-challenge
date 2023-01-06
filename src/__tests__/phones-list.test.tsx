import useSWR from "swr";
import { render, waitFor } from "@testing-library/react";
import { samplePhonesData } from "@utils/sample-data";
import PhonesList from "@components/phones-list";

jest.mock("swr");

test("renders the correct number of rows", async () => {
  (useSWR as jest.Mock).mockReturnValue({
    data: { results: samplePhonesData, count: 12 },
  });
  const { findAllByRole } = render(<PhonesList searchFilter={null} />);
  await waitFor(async () => {
    const items = await findAllByRole("row");
    expect(items).toHaveLength(12);
  });
});
